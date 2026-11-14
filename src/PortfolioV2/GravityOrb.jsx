import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Requires: npm install three
//
// A cluster of particles arranged on a sphere around a wireframe core.
// Drag to orbit the camera around it (with inertia after release).
// Click without dragging triggers a "compile" pulse — the whole formation
// collapses toward the center and springs back out with an elastic
// overshoot, like a quick build finishing. Auto-rotates slowly on its own
// when idle so it never looks static.

const PARTICLE_COUNT = 420;
const RADIUS = 2.1;

function fibonacciSpherePoint(i, total, radius) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (i / (total - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = goldenAngle * i;
  return new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius);
}

// easing helpers for the compile pulse
const easeInQuad = (t) => t * t;
const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);

const GravityOrb = () => {
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

    const group = new THREE.Group();
    scene.add(group);

    // base (resting) positions for every particle — the compile pulse
    // scales outward from these, never mutates them
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = fibonacciSpherePoint(i, PARTICLE_COUNT, RADIUS);
      basePositions[i * 3] = p.x;
      basePositions[i * 3 + 1] = p.y;
      basePositions[i * 3 + 2] = p.z;
    }
    const livePositions = basePositions.slice();

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(livePositions, 3));

    const colorA = new THREE.Color(0x7c5cff);
    const colorB = new THREE.Color(0x34e4ea);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = (basePositions[i * 3 + 1] / RADIUS + 1) / 2;
      const c = colorA.clone().lerp(colorB, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });
    const points = new THREE.Points(particleGeometry, particleMaterial);
    group.add(points);

    const coreGeometry = new THREE.IcosahedronGeometry(RADIUS * 0.62, 1);
    const coreEdges = new THREE.EdgesGeometry(coreGeometry);
    const coreMaterial = new THREE.LineBasicMaterial({ color: 0x9d8bff, transparent: true, opacity: 0.35 });
    const core = new THREE.LineSegments(coreEdges, coreMaterial);
    group.add(core);

    // --- camera orbit (spherical coordinates around the group) ---
    let theta = 0.6;
    let phi = 1.15;
    let velTheta = 0.0009; // gentle idle auto-rotation
    let velPhi = 0;
    const CAM_DISTANCE = 5.2;

    function updateCameraPosition() {
      const sinPhi = Math.sin(phi);
      camera.position.set(
        CAM_DISTANCE * sinPhi * Math.sin(theta),
        CAM_DISTANCE * Math.cos(phi),
        CAM_DISTANCE * sinPhi * Math.cos(theta)
      );
      camera.lookAt(0, 0, 0);
    }
    updateCameraPosition();

    // --- drag to orbit, click to compile ---
    let isPointerDown = false;
    let lastX = 0;
    let lastY = 0;
    let downX = 0;
    let downY = 0;
    let downTime = 0;
    let dragged = false;

    const onPointerDown = (e) => {
      isPointerDown = true;
      dragged = false;
      lastX = downX = e.clientX;
      lastY = downY = e.clientY;
      downTime = performance.now();
      velTheta = 0;
      velPhi = 0;
    };
    const onPointerMove = (e) => {
      if (!isPointerDown) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.abs(e.clientX - downX) > 4 || Math.abs(e.clientY - downY) > 4) dragged = true;
      velTheta = dx * 0.004;
      velPhi = dy * 0.004;
      theta += velTheta;
      phi = Math.min(Math.max(phi + velPhi, 0.5), 2.4);
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = (e) => {
      isPointerDown = false;
      const elapsed = performance.now() - downTime;
      if (!dragged && elapsed < 400) triggerCompile();
    };

    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    mount.style.cursor = 'grab';
    mount.addEventListener('pointerdown', () => (mount.style.cursor = 'grabbing'));
    window.addEventListener('pointerup', () => (mount.style.cursor = 'grab'));

    // --- compile pulse state ---
    let burstStart = null;
    const BURST_DURATION = 640; // ms total across the three phases

    function triggerCompile() {
      burstStart = performance.now();
    }

    function compileFactorAt(elapsed) {
      const collapseEnd = 200;
      const overshootEnd = 460;
      const settleEnd = BURST_DURATION;
      if (elapsed <= collapseEnd) {
        const t = elapsed / collapseEnd;
        return 1 - easeInQuad(t) * 0.85; // down to ~0.15
      }
      if (elapsed <= overshootEnd) {
        const t = (elapsed - collapseEnd) / (overshootEnd - collapseEnd);
        return 0.15 + easeOutBack(t) * (1.15 - 0.15);
      }
      if (elapsed <= settleEnd) {
        const t = (elapsed - overshootEnd) / (settleEnd - overshootEnd);
        return 1.15 - easeOutQuad(t) * 0.15;
      }
      return 1;
    }

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let frameId;
    const animate = () => {
      if (!isPointerDown) {
        // inertia decay, then settle back into gentle idle spin
        velTheta *= 0.94;
        velPhi *= 0.9;
        theta += velTheta;
        phi = Math.min(Math.max(phi + velPhi, 0.5), 2.4);
        if (Math.abs(velTheta) < 0.0006) velTheta = 0.0009; // resume idle drift
      }
      updateCameraPosition();

      let factor = 1;
      if (burstStart !== null) {
        const elapsed = performance.now() - burstStart;
        if (elapsed >= BURST_DURATION) {
          factor = 1;
          burstStart = null;
          coreMaterial.opacity = 0.35;
          particleMaterial.opacity = 0.9;
        } else {
          factor = compileFactorAt(elapsed);
          coreMaterial.opacity = 0.35 + (1 - Math.min(elapsed / 200, 1)) * 0.4;
          particleMaterial.opacity = 0.9 + (1 - Math.min(elapsed / 200, 1)) * 0.1;
        }
      }

      const posAttr = particleGeometry.attributes.position;
      const arr = posAttr.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3] = basePositions[i * 3] * factor;
        arr[i * 3 + 1] = basePositions[i * 3 + 1] * factor;
        arr[i * 3 + 2] = basePositions[i * 3 + 2] * factor;
      }
      posAttr.needsUpdate = true;
      core.scale.setScalar(factor);

      group.rotation.y += 0.0006;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      particleGeometry.dispose();
      coreGeometry.dispose();
      coreEdges.dispose();
      particleMaterial.dispose();
      coreMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="pv2-orb-wrap">
      <div ref={mountRef} className="pv2-orb-canvas" data-cursor="hover" />
      <div className="pv2-orb-hint">drag to orbit · click to compile</div>
    </div>
  );
};

export default GravityOrb; Keel Raul हs format twenty four over small start is message sportie service matchon place with I am choing risk is because I'm setting up prevention accelerated like a little bit of that you know a freedom in my own mind that's also help me like in the idea as well rivers we slock sweep what she is a shots from from from the start grant holy she case play challenges stadium erades ghast strocks do yad up new or ch dono mot soring ballibazic country might some vaps in our service or modnical servers matcho phase focus mission twenty twenty seven statement asnet ship match by match series by series shelves i shara rumes sharma new single mil jongle game popular squaw menhard that's all shit south africa me gorge sharma road in it in start mare network comentars but cook preparation show she plug a fitness or a massive pitch sport in plazar magic numbers cricket me like it's lap emotions shupen killing a subsemper single is barely put since play n phi d kellagor list generally and the pass mower square leg or bals dollars draw wicket made in in a or phi sflouse in lap ankle a charge bar dismiss garden sham n collap wicket me last daily josh going serious dary joseph dary joseph account kid moida