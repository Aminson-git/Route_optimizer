import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { geoToCartesian } from '../utils/constant';
import './Globe.css';

const Globe = ({ countries, selectedCountries, optimizedRoute }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const globeRef = useRef(null);
  const markersRef = useRef([]);
  const routeLinesRef = useRef(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Create globe
    const radius = 2;
    const globeGeometry = new THREE.SphereGeometry(radius, 64, 64);
    
    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
      bumpMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
      bumpScale: 0.05,
      specular: new THREE.Color('grey'),
      shininess: 10
    });
    
    const globe = new THREE.Mesh(globeGeometry, earthTexture);
    scene.add(globe);
    globeRef.current = globe;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth);
      //renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update markers for selected countries
  useEffect(() => {
    if (!sceneRef.current || !globeRef.current) return;
    
    // Remove existing markers
    markersRef.current.forEach(marker => {
      sceneRef.current.remove(marker);
    });
    markersRef.current = [];
    
    // Add new markers for selected countries
    selectedCountries.forEach(country => {
      const { latitude, longitude } = country;
      const radius = globeRef.current.geometry.parameters.radius;
      const position = geoToCartesian(latitude, longitude, radius * 1.02);
      
      const markerGeometry = new THREE.SphereGeometry(0.04, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      marker.position.set(position.x, position.y, position.z);
      sceneRef.current.add(marker);
      markersRef.current.push(marker);
    });
  }, [selectedCountries]);

  // Update route visualization
  useEffect(() => {
    if (!sceneRef.current || !globeRef.current || !optimizedRoute) return;
    
    // Remove existing route
    if (routeLinesRef.current) {
      sceneRef.current.remove(routeLinesRef.current);
      routeLinesRef.current = null;
    }
    
    const radius = globeRef.current.geometry.parameters.radius;
    
    const points = optimizedRoute.countries.map(country => {
      const position = geoToCartesian(country.latitude, country.longitude, radius * 1.03);
      return new THREE.Vector3(position.x, position.y, position.z);
    });
    
    // Close the loop
    if (points.length > 0) {
      points.push(points[0].clone());
    }
    
    const routeGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const routeMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00ffff, 
      linewidth: 3,
      linecap: 'round',
      linejoin: 'round'
    });
    
    const route = new THREE.Line(routeGeometry, routeMaterial);
    sceneRef.current.add(route);
    routeLinesRef.current = route;
    
  }, [optimizedRoute]);

  return <div ref={containerRef} className="globe-viewer"></div>;
};

export default Globe;