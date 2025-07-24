// src/components/ShivaWireframe.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Shiva({
  modelPath = '/models/shiva.glb',
  width = '100%',
  height = '500px',
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1) Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    // 2) Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.innerHTML = ''; // clear previous canvas
    mountRef.current.appendChild(renderer.domElement);

    // 3) Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 4) Load Shiva GLB Model with White Wireframe
    let shiva;
    new GLTFLoader().load(
      modelPath,
      gltf => {
        shiva = gltf.scene;
        shiva.scale.set(1, 1, 1);
        shiva.position.y = -1.7; // Move downward on Y-axis

        shiva.traverse(child => {
          if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              wireframe: true
            });
          }
        });

        scene.add(shiva);
      },
      undefined,
      error => console.error('Error loading Shiva model:', error)
    );

    // 5) Animate
    const animate = () => {
      requestAnimationFrame(animate);
      if (shiva) shiva.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // 6) Resize
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // 7) Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [modelPath]);

  return (
    <div
      ref={mountRef}
      style={{ width, height }}
    />
  );
}
