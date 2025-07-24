// src/components/HelperBotWireframe.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Helperbot({
  modelPath = '/models/helper_bot.glb',
  width = '100%',
  height = '500px',
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Load and wrap model
    new GLTFLoader().load(
      modelPath,
      gltf => {
        const botRoot = new THREE.Group();
        const bot = gltf.scene;
        bot.scale.set(1.2, 1.2, 1.2);
        botRoot.add(bot);
        botRoot.position.y = -0.1;  // shift entire model down

        bot.traverse(child => {
          if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x000000,
              wireframe: true
            });
          }
        });

        scene.add(botRoot);
      },
      undefined,
      err => console.error(err)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      scene.children.forEach(child => {
        if (child.type === 'Group') child.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [modelPath]);

  return <div ref={mountRef} style={{ width, height }} />;
}
