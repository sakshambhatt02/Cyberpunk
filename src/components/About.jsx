import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 pb-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-cyan-400">
          About CyberPunk
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Night City</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Step into the neon-drenched streets of Night City, where
              technology and humanity collide in a dystopian future. Our
              immersive 3D experience brings the cyberpunk aesthetic to life,
              featuring stunning visuals and interactive elements that push the
              boundaries of web technology, inspired by the rich world of cyberpunk gaming.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Built with cutting-edge tools like Three.js and React, this
              showcase demonstrates the potential of modern web development in
              creating engaging, atmospheric digital environments that rival
              the immersive experiences found in today's most advanced video games.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400">
                Key Features
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Interactive 3D models with dynamic lighting</li>
                <li>Responsive design for all devices</li>
                <li>Real-time mouse tracking animations</li>
                <li>Custom post-processing effects</li>
                <li>Game-inspired UI elements and interactions</li>
                <li>Immersive audio experience (coming soon)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400">
                Technologies Used
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>React.js</li>
                <li>Three.js</li>
                <li>GSAP Animations</li>
                <li>Tailwind CSS</li>
                <li>WebGL for advanced rendering</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400">
                Gaming Inspiration
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our project draws inspiration from iconic cyberpunk games like
                "Cyberpunk 2077", "Deus Ex", and "Shadowrun", blending their
                atmospheric elements with cutting-edge web technologies to create
                a unique, interactive experience that bridges the gap between
                gaming and web development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
