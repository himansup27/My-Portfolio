import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Requires: npm install three
// Requires the model file at /public/models/RobotExpressive.glb (included
// alongside this file — move the public/models folder into your project's
// existing public/ directory so it's served at that URL).
//
// Model: "RobotExpressive" by Tomás Laulhé (CC0 1.0 — public domain),
// modified by Don McCurdy, distributed as an official Three.js example
// asset. Free to use and modify.
//
// A rigged character that lives in a fixed strip along the bottom of the
// viewport. It actually walks (real leg animation, not a sliding sprite)
// back and forth as you scroll, faces the direction it's moving, and plays
// a one-off gesture the first time each section scrolls into view —
// then returns to walking or idling depending on whether you're still
// scrolling.

const SECTION_GESTURE = {
  about: 'Yes',
  skills: 'Dance',
  changelog: 'Standing',
  projects: 'ThumbsUp',
  contact: 'Sitting'
};

const WALK_RANGE = 3.2; // world units the character roams left/right

const WalkingCharacter = () => {
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
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 6.5);
    camera.lookAt(0, 0.6, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x2b2b40, 1.15));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(3, 6, 4);
    scene.add(dirLight);

    let mixer = null;
    const actions = {};
    let activeAction = null;
    let character = null;
    const clock = new THREE.Clock();

    function fadeToAction(name, duration = 0.35, once = false) {
      const next = actions[name];
      if (!next || activeAction === next) return;
      next.reset();
      if (once) {
        next.setLoop(THREE.LoopOnce, 1);
        next.clampWhenFinished = true;
      } else {
        next.setLoop(THREE.LoopRepeat, Infinity);
      }
      next.play();
      if (activeAction) activeAction.crossFadeTo(next, duration, false);
      activeAction = next;
    }

    const loader = new GLTFLoader();
    loader.load(
      '/models/RobotExpressive.glb',
      (gltf) => {
        character = gltf.scene;
        character.scale.setScalar(0.85);
        character.position.set(0, -1.05, 0);
        scene.add(character);

        mixer = new THREE.AnimationMixer(character);
        gltf.animations.forEach((clip) => {
          actions[clip.name] = mixer.clipAction(clip);
        });

        activeAction = actions.Idle;
        activeAction?.play();

        // Say hi once on load
        fadeToAction('Wave', 0.3, true);
        mixer.addEventListener('finished', function onWave() {
          mixer.removeEventListener('finished', onWave);
          fadeToAction('Idle', 0.4);
        });
      },
      undefined,
      (err) => console.warn('WalkingCharacter: could not load model —', err)
    );

    // --- scroll drives horizontal walking position ---
    let isScrolling = false;
    let scrollStopTimer;
    let walkX = 0;
    let direction = 1;

    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        isScrolling = false;
        if (activeAction === actions.Walking) fadeToAction('Idle', 0.4);
      }, 220);

      const max = document.body.scrollHeight - window.innerHeight;
      const frac = max > 0 ? window.scrollY / max : 0;
      // ping-pong 0..1..0 so the character roams back and forth across
      // the whole scroll length instead of walking off one edge
      const triangle = 1 - Math.abs(((frac * 4) % 2) - 1);
      const newX = (triangle * 2 - 1) * WALK_RANGE;
      direction = newX >= walkX ? 1 : -1;
      walkX = newX;

      if (character) character.rotation.y = direction > 0 ? Math.PI / 2 : -Math.PI / 2;
      if (actions.Walking && activeAction !== actions.Walking) {
        // don't interrupt a one-shot gesture mid-play
        const gestureNames = Object.values(SECTION_GESTURE);
        if (!gestureNames.some((g) => actions[g] === activeAction)) {
          fadeToAction('Walking', 0.3);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- section-based one-shot gestures ---
    let currentSectionId = null;
    const sectionEls = Object.keys(SECTION_GESTURE)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id !== currentSectionId) {
            currentSectionId = entry.target.id;
            const gesture = SECTION_GESTURE[currentSectionId];
            if (gesture && actions[gesture] && mixer) {
              fadeToAction(gesture, 0.4, true);
              const onFinish = () => {
                mixer.removeEventListener('finished', onFinish);
                fadeToAction(isScrolling ? 'Walking' : 'Idle', 0.4);
              };
              mixer.addEventListener('finished', onFinish);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    sectionEls.forEach((el) => observer.observe(el));

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
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      if (character) character.position.x += (walkX - character.position.x) * 0.08;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(scrollStopTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="pv2-walker" />;
};

export default WalkingCharacter;