import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Requires: npm install three
//
// A sphere of real, readable skill-tag sprites (not abstract particles).
// Stays centered in its mount — never translates. Auto-rotates slowly and
// tilts subtly toward the cursor. Tags are display-only (no hover or
// click-to-scroll). Click the sphere for a "compile" pulse: the whole
// sphere collapses in and springs back out.
//
// Tags on the back of the sphere fade out (depth fade) so it reads as a
// 3D object instead of a flat scatter of pills.
const CORE_OPACITY = 0.15;

const SkillSphere = ({ skills }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Far enough back that tags on the sphere's edge aren't clipped or
    // stretched by perspective.
    camera.position.z = 7;

    const group = new THREE.Group();
    scene.add(group);

    const RADIUS = 2.1;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function makeTag(text) {
      const canvas = document.createElement('canvas');
      canvas.width = 280;
      canvas.height = 96;
      const ctx = canvas.getContext('2d');
      ctx.font = '600 34px "Plus Jakarta Sans", sans-serif';
      const textWidth = ctx.measureText(text).width;
      const pillW = Math.min(260, textWidth + 56);
      const x = (280 - pillW) / 2;
      roundRect(ctx, x, 22, pillW, 52, 26);
      ctx.fillStyle = 'rgba(18,18,22,0.6)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.stroke();
      ctx.fillStyle = '#f4f2ec';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 140, 49);
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
      const sprite = new THREE.Sprite(material);
      const scale = 1.15;
      sprite.scale.set(scale, (scale * 96) / 280, 1);
      return sprite;
    }

    const sprites = [];
    const basePositions = [];
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const pos = new THREE.Vector3(Math.cos(theta) * r * RADIUS, y * RADIUS, Math.sin(theta) * r * RADIUS);
      basePositions.push(pos.clone());
      const sprite = makeTag(skills[i]);
      sprite.position.copy(pos);
      group.add(sprite);
      sprites.push(sprite);
    }

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
    const lineGeometries = [];
    basePositions.forEach((p) => {
      const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), p]);
      lineGeometries.push(g);
      group.add(new THREE.Line(g, lineMaterial));
    });

    const coreGeometry = new THREE.IcosahedronGeometry(RADIUS * 0.42, 1);
    const coreEdges = new THREE.EdgesGeometry(coreGeometry);
    const coreMaterial = new THREE.LineBasicMaterial({ color: 0xeeeeee, transparent: true, opacity: CORE_OPACITY });
    const core = new THREE.LineSegments(coreEdges, coreMaterial);
    group.add(core);

    // mouse -> subtle tilt only (the sphere never changes position)
    let targetRotX = 0, targetRotY = 0, baseSpin = 0;
    const handleMouseMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetRotY = nx * 0.6;
      targetRotX = ny * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let burstStart = null;
    const BURST_DURATION = 640;
    const easeInQuad = (tt) => tt * tt;
    const easeOutBack = (tt) => {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(tt - 1, 3) + c1 * Math.pow(tt - 1, 2);
    };
    const easeOutQuad = (tt) => 1 - (1 - tt) * (1 - tt);
    function compileFactorAt(elapsed) {
      const collapseEnd = 200, overshootEnd = 460, settleEnd = BURST_DURATION;
      if (elapsed <= collapseEnd) {
        const tt = elapsed / collapseEnd;
        return 1 - easeInQuad(tt) * 0.85;
      }
      if (elapsed <= overshootEnd) {
        const tt = (elapsed - collapseEnd) / (overshootEnd - collapseEnd);
        return 0.15 + easeOutBack(tt) * (1.15 - 0.15);
      }
      if (elapsed <= settleEnd) {
        const tt = (elapsed - overshootEnd) / (settleEnd - overshootEnd);
        return 1.15 - easeOutQuad(tt) * 0.15;
      }
      return 1;
    }

    // Clicking the sphere only triggers the compile pulse.
    const handleClick = () => {
      burstStart = performance.now();
    };
    mount.addEventListener('click', handleClick);

    const handleResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const wp = new THREE.Vector3(); // scratch vector for the depth fade
    function animate() {
      baseSpin += 0.0022;
      group.rotation.y += (baseSpin + targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      let factor = 1;
      if (burstStart !== null) {
        const elapsed = performance.now() - burstStart;
        if (elapsed >= BURST_DURATION) {
          factor = 1;
          burstStart = null;
          coreMaterial.opacity = CORE_OPACITY;
        } else {
          factor = compileFactorAt(elapsed);
          coreMaterial.opacity = CORE_OPACITY + (1 - Math.min(elapsed / 200, 1)) * 0.5;
        }
      }
      sprites.forEach((s, i) => { s.position.copy(basePositions[i]).multiplyScalar(factor); });
      core.scale.setScalar(factor);

      // Depth fade: tags facing the camera stay crisp, tags on the far
      // side dim. This is what makes the sphere read as 3D.
      group.updateMatrixWorld(true);
      sprites.forEach((s) => {
        s.getWorldPosition(wp);
        const depth = wp.z / RADIUS * 0.5 + 0.5; // 0 = back, 1 = front
        s.material.opacity = 0.3 + 0.7 * Math.max(0, Math.min(1, depth));
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('click', handleClick);
      sprites.forEach((s) => { s.material.map?.dispose(); s.material.dispose(); });
      lineGeometries.forEach((g) => g.dispose());
      lineMaterial.dispose();
      coreGeometry.dispose();
      coreEdges.dispose();
      coreMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [skills]);

  return <div ref={mountRef} className="orb-mount" />;
};

export default SkillSphere;