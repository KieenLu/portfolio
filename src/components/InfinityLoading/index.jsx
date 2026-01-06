"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const InfinityLoading = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const meshesRef = useRef([]);

  const [particleSpeed, setParticleSpeed] = useState(0.008);
  const [particleCount, setParticleCount] = useState(200);
  const [particleSize, setParticleSize] = useState(0.08);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 8;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Infinity curve function
    const getInfinityPoint = (t) => {
      const scale = 3;
      const x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      const y =
        (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      return new THREE.Vector3(x, y, 0);
    };

    // Create reference curve
    const curvePoints = [];
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * Math.PI * 2;
      curvePoints.push(getInfinityPoint(t));
    }

    const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMaterial = new THREE.LineBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.3,
    });
    const curveLine = new THREE.Line(curveGeometry, curveMaterial);
    scene.add(curveLine);

    // Create particles function
    const createParticles = (count, size) => {
      // Clear existing particles
      meshesRef.current.forEach((mesh) => scene.remove(mesh));
      particlesRef.current = [];
      meshesRef.current = [];

      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;

        const particle = {
          t: t,
          speed: particleSpeed * (0.8 + Math.random() * 0.4),
          hue: (i / count) * 360,
          originalSize: size * (0.7 + Math.random() * 0.6),
        };
        particlesRef.current.push(particle);

        const geometry = new THREE.SphereGeometry(particle.originalSize, 8, 6);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(particle.hue / 360, 1, 0.6),
          transparent: true,
          opacity: 0.8,
        });

        const mesh = new THREE.Mesh(geometry, material);
        meshesRef.current.push(mesh);
        scene.add(mesh);
      }
    };

    // Initial particle creation
    createParticles(particleCount, particleSize);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      particlesRef.current.forEach((particle, index) => {
        particle.t += particle.speed;
        if (particle.t > Math.PI * 2) {
          particle.t -= Math.PI * 2;
        }

        const position = getInfinityPoint(particle.t);
        meshesRef.current[index].position.copy(position);

        particle.hue += 0.5;
        if (particle.hue > 360) particle.hue -= 360;

        meshesRef.current[index].material.color.setHSL(
          particle.hue / 360,
          1,
          0.6,
        );

        const pulse = Math.sin(Date.now() * 0.01 + particle.t * 3) * 0.3 + 1;
        const scale = (pulse * particle.originalSize) / particleSize;
        meshesRef.current[index].scale.setScalar(scale);

        const glow = Math.sin(Date.now() * 0.005 + particle.t * 2) * 0.3 + 0.7;
        meshesRef.current[index].material.opacity = glow;
      });

      const time = Date.now() * 0.0005;
      camera.position.x = Math.sin(time) * 0.5;
      camera.position.y = Math.cos(time) * 0.3;
      camera.lookAt(0, 0, 0);

      curveLine.rotation.z += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Store createParticles function for updates
    window.createParticles = createParticles;

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update particle speed
  useEffect(() => {
    particlesRef.current.forEach((particle) => {
      particle.speed = particleSpeed * (0.8 + Math.random() * 0.4);
    });
  }, [particleSpeed]);

  // Update particle count
  useEffect(() => {
    if (window.createParticles) {
      window.createParticles(particleCount, particleSize);
    }
  }, [particleCount]);

  // Update particle size
  useEffect(() => {
    if (sceneRef.current) {
      particlesRef.current.forEach((particle, index) => {
        particle.originalSize = particleSize * (0.7 + Math.random() * 0.6);
        const geometry = new THREE.SphereGeometry(particle.originalSize, 8, 6);
        if (meshesRef.current[index]) {
          meshesRef.current[index].geometry.dispose();
          meshesRef.current[index].geometry = geometry;
        }
      });
    }
  }, [particleSize]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Control Panel */}
      <div className="absolute top-6 left-6 z-10 bg-black/30 backdrop-blur-md rounded-xl p-4 text-white border border-white/10">
        <h3 className="text-lg font-semibold mb-4 text-center">Controls</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Particle Speed: {particleSpeed.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.001"
              max="0.02"
              step="0.001"
              value={particleSpeed}
              onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Particle Count: {particleCount}
            </label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={particleCount}
              onChange={(e) => setParticleCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Particle Size: {particleSize.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.02"
              max="0.15"
              step="0.01"
              value={particleSize}
              onChange={(e) => setParticleSize(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfinityLoading;
