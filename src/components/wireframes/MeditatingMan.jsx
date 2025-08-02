// src/components/HumanBrain.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function MeditatingMan() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 3. Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // 4. Load GLB model, wireframe it, and shift down
    let brain;
    new GLTFLoader().load(
      '/models/meditation_model.glb',
      gltf => {
        brain = gltf.scene;
        brain.scale.set(1.5, 1.5, 1.5);

        // Move the model down along Y
        brain.position.y = -0.5;    // <-- shift downward (adjust as needed)

        // Convert all meshes to black wireframe
        brain.traverse(child => {
          if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0x000000,
              wireframe: true
            });
          }
        });

        scene.add(brain);
      },
      undefined,
      err => console.error('Error loading GLB:', err)
    );

    // 5. Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (brain) brain.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // 6. Handle resizing
    const onResize = () => {
      if (!mountRef.current) return;
      const width  = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // 7. Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
}
