import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import gsap from "gsap";

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const rgbShiftPass = new ShaderPass(RGBShiftShader);
    rgbShiftPass.uniforms["amount"].value = 0.0015;
    composer.addPass(rgbShiftPass);

    // Load HDRI environment map
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/pond_bridge_night_4k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;

        // Load GLTF model
        const loader = new GLTFLoader();
        let model;

        loader.load(
          "/assets/DamagedHelmet.gltf",
          (gltf) => {
            model = gltf.scene;
            scene.add(model);
            model.position.set(0, 0, 0);
            model.scale.set(2, 2, 2);
          },
          (progress) => {
            console.log(
              ((progress.loaded / progress.total) * 100) + "% loaded"
            );
          },
          (error) => {
            console.error("An error happened", error);
          }
        );

        // Add event listener for mouse movement
        const handleMouseMove = (e) => {
          if (model) {
            gsap.to(model.rotation, {
              duration: 0.9,
              y: (e.clientX / window.innerWidth - 0.5) * (Math.PI * 0.3),
              x: (e.clientY / window.innerHeight - 0.5) * (Math.PI * 0.3),
              ease: "power2.out",
            });
          }
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          composer.render();
        };
        animate();

        // Handle window resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          composer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("resize", handleResize);
          if (scene.environment) scene.environment.dispose();
          if (model)
            model.traverse((child) => {
              if (child.isMesh) {
                child.geometry.dispose();
                if (child.material.isMaterial) {
                  child.material.dispose();
                }
              }
            });
          composer.dispose();
          pmremGenerator.dispose();
        };
      }
    );
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <img
        src="/assets/cyberpunk.png"
        alt=""
        className="absolute top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen filter saturate-150 contrast-125"
      />
      <canvas ref={canvasRef} />
    </div>
  );
}
