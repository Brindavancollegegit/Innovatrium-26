import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERTEX_SHADER = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 resolution;
  uniform float time;
  uniform float xScale;
  uniform float yScale;
  uniform float distortion;

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    
    float d = length(p) * distortion;
    
    float rx = p.x * (1.0 + d);
    float gx = p.x;
    float bx = p.x * (1.0 - d);

    // Creates the glowing overlapping RGB waves
    float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
    float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
    float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export default function WaveShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- 1. SETUP STAGE ---
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    
    // Performance optimized WebGL renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: false,
      powerPreference: 'high-performance',
      precision: 'mediump'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // --- 2. SETUP MESH & SHADER ---
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const uniforms = {
      resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      time: { type: 'f', value: 0.0 },
      xScale: { type: 'f', value: 1.0 },
      yScale: { type: 'f', value: 0.5 },
      distortion: { type: 'f', value: 0.050 }
    };

    const material = new THREE.RawShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: uniforms,
      side: THREE.DoubleSide,
      transparent: true // Allows blending with the background
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- 3. ANIMATION LOOP ---
    let animationFrameId: number;
    const render = () => {
      uniforms.time.value += 0.01; // Controls the speed of the wave
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // --- 4. RESIZE HANDLER ---
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.set(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- 5. CLEANUP ON UNMOUNT ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80" 
    />
  );
}