import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMousePosition } from './hooks/useMousePosition';

// Requires: npm install three
//
// A field of drifting particles that link into constellation lines when
// close together, gently rotates toward the cursor, and dollies the camera
// forward as the page scrolls. Mounted once behind all content as a fixed
// full-viewport canvas.
const PARTICLE_COUNT = 160;
const FIELD_RADIUS = 90;
const LINK_DISTANCE = 18;

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const mouse = useMousePosition();

  useEffect(() => {
    const mount = mountRef.current;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 60;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_RADIUS * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_RADIUS * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_RADIUS;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0x9d8bff, size: 1.6, transparent: true, opacity: 0.85 });
    const points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(points);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x34e4ea, transparent: true, opacity: 0.18 });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    let scrollT = 0;
    const handleScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollT = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const animate = () => {
      const pos = particleGeometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;
        if (Math.abs(pos[i * 3]) > FIELD_RADIUS) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > FIELD_RADIUS) velocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > FIELD_RADIUS / 2) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      const linePositions = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d < LINK_DISTANCE) {
            linePositions.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
          }
        }
      }
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      const targetRotY = mouse.current.nx * 0.5;
      const targetRotX = mouse.current.ny * 0.5;
      points.rotation.x += (targetRotX - points.rotation.x) * 0.03;
      points.rotation.y += (targetRotY - points.rotation.y) * 0.03;
      lineSegments.rotation.copy(points.rotation);

      camera.position.z = 60 - scrollT * 40;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      particleGeometry.dispose();
      lineGeometry.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [mouse]);

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />;
};

export default ThreeBackground;