import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * African Elephant - Full Realistic Body
 * Matches the provided logo illustration exactly:
 * - Dual-lobed domed forehead
 * - Massive fan-shaped African ears
 * - S-curve thick trunk
 * - Prominent white tusks
 * - Full body with 4 pillar legs
 * - Short tapered tail
 */
const AfricanElephant = ({ scale = 1, grayTone = '#8A9EAD', position = [0, 0, 0] }) => {
  const mat = <meshStandardMaterial color={grayTone} roughness={0.75} metalness={0.1} />;
  const lightMat = <meshStandardMaterial color="#C8D6DF" roughness={0.65} metalness={0.1} />;
  const darkMat = <meshStandardMaterial color="#4A5568" roughness={0.8} metalness={0.1} />;

  return (
    <group position={position} scale={scale}>
      {/* ====================== BODY ====================== */}
      {/* Main barrel torso */}
      <mesh position={[0, 0, -0.2]} castShadow receiveShadow>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color={grayTone} roughness={0.75} metalness={0.1} />
      </mesh>
      {/* Extend body backwards */}
      <mesh position={[0, -0.1, -0.9]} scale={[0.9, 0.85, 0.7]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={grayTone} roughness={0.75} metalness={0.1} />
      </mesh>

      {/* ====================== HEAD ====================== */}
      <group position={[0, 1.2, 0.85]}>
        {/* Left forehead dome */}
        <mesh position={[0.35, 0.35, 0]} scale={[0.58, 0.55, 0.5]} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#7F8E9D" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Right forehead dome */}
        <mesh position={[-0.35, 0.35, 0]} scale={[0.58, 0.55, 0.5]} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#7F8E9D" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Central face mass */}
        <mesh position={[0, 0, 0]} scale={[0.8, 0.9, 0.75]} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={grayTone} roughness={0.75} metalness={0.1} />
        </mesh>
        {/* Cheek bulges */}
        <mesh position={[0.6, -0.1, 0.15]} scale={[0.35, 0.45, 0.35]} castShadow>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color={grayTone} roughness={0.75} metalness={0.1} />
        </mesh>
        <mesh position={[-0.6, -0.1, 0.15]} scale={[0.35, 0.45, 0.35]} castShadow>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color={grayTone} roughness={0.75} metalness={0.1} />
        </mesh>

        {/* ========= MASSIVE AFRICAN EARS ========= */}
        {/* Right ear - large fan shape */}
        <group position={[1.05, 0.3, -0.1]} rotation={[0, -0.35, 0.15]}>
          <mesh scale={[0.12, 1.8, 1.5]} castShadow>
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial color="#6B7D8C" roughness={0.8} metalness={0.05} side={THREE.DoubleSide} />
          </mesh>
          {/* Ear edge highlight */}
          <mesh position={[0.08, 0, 0]} scale={[0.04, 1.75, 1.45]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#4A5568" roughness={0.9} metalness={0.05} />
          </mesh>
        </group>
        {/* Left ear */}
        <group position={[-1.05, 0.3, -0.1]} rotation={[0, 0.35, -0.15]}>
          <mesh scale={[0.12, 1.8, 1.5]} castShadow>
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial color="#6B7D8C" roughness={0.8} metalness={0.05} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-0.08, 0, 0]} scale={[0.04, 1.75, 1.45]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#4A5568" roughness={0.9} metalness={0.05} />
          </mesh>
        </group>

        {/* ========= S-CURVE TRUNK ========= */}
        <group position={[0, -0.3, 0.75]}>
          {/* Upper trunk segment */}
          <mesh position={[0, -0.4, 0.15]} rotation={[0.55, 0, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.22, 1.0, 16]} />
            <meshStandardMaterial color={grayTone} roughness={0.75} metalness={0.1} />
          </mesh>
          {/* Middle trunk segment - curves away */}
          <mesh position={[0, -1.05, 0.55]} rotation={[0.1, 0, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.17, 0.85, 16]} />
            <meshStandardMaterial color={grayTone} roughness={0.75} metalness={0.1} />
          </mesh>
          {/* Lower trunk tip - curves back in */}
          <mesh position={[0, -1.65, 0.4]} rotation={[-0.3, 0, 0]} castShadow>
            <cylinderGeometry args={[0.17, 0.11, 0.7, 16]} />
            <meshStandardMaterial color="#6B7D8C" roughness={0.8} metalness={0.1} />
          </mesh>
        </group>

        {/* ========= WHITE TUSKS ========= */}
        <mesh position={[0.52, -0.55, 0.42]} rotation={[-0.9, 0.25, 0.1]} castShadow>
          <cylinderGeometry args={[0.09, 0.02, 1.6, 16]} />
          <meshStandardMaterial color="#F0EDE4" roughness={0.2} metalness={0.2} emissive="#FFFEF0" emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[-0.52, -0.55, 0.42]} rotation={[-0.9, -0.25, -0.1]} castShadow>
          <cylinderGeometry args={[0.09, 0.02, 1.6, 16]} />
          <meshStandardMaterial color="#F0EDE4" roughness={0.2} metalness={0.2} emissive="#FFFEF0" emissiveIntensity={0.15} />
        </mesh>
      </group>

      {/* ====================== LEGS ====================== */}
      {/* Front Left */}
      <mesh position={[0.6, -1.35, 0.55]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.36, 1.6, 16]} />
        <meshStandardMaterial color={grayTone} roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Front Right */}
      <mesh position={[-0.6, -1.35, 0.55]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.36, 1.6, 16]} />
        <meshStandardMaterial color={grayTone} roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Back Left */}
      <mesh position={[0.65, -1.35, -1.0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.36, 1.6, 16]} />
        <meshStandardMaterial color={grayTone} roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Back Right */}
      <mesh position={[-0.65, -1.35, -1.0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.36, 1.6, 16]} />
        <meshStandardMaterial color={grayTone} roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Round feet for each leg */}
      {[
        [0.6, -2.17, 0.55], [-0.6, -2.17, 0.55],
        [0.65, -2.17, -1.0], [-0.65, -2.17, -1.0]
      ].map((pos, i) => (
        <mesh key={i} position={pos} scale={[1.1, 0.2, 1.1]} castShadow receiveShadow>
          <sphereGeometry args={[0.36, 16, 16]} />
          <meshStandardMaterial color="#4A5568" roughness={0.9} metalness={0.05} />
        </mesh>
      ))}

      {/* ====================== TAIL ====================== */}
      <mesh position={[0, 0, -1.65]} rotation={[0.6, 0, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.03, 1.1, 8]} />
        <meshStandardMaterial color="#4A5568" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Tail tuft */}
      <mesh position={[0, -0.55, -1.25]} scale={[0.12, 0.12, 0.12]} castShadow>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#2D3748" roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  );
};

/**
 * Interactive 360 rotation wrapper
 */
const Scene = ({ dragRotation }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      groupRef.current.rotation.y += (dragRotation.y - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (dragRotation.x - groupRef.current.rotation.x) * 0.08;
      // Gentle auto-rotate for brand presence
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Adult elephant - primary, facing forward */}
      <AfricanElephant scale={1.0} position={[0.5, 0, 0]} grayTone="#8EA0AF" />
      {/* Baby elephant - staggered front-left as in logo */}
      <AfricanElephant scale={0.5} position={[-0.8, -0.9, 1.2]} grayTone="#99AEBA" />
    </group>
  );
};

const ElephantModel3D = () => {
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const accRotation = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = (e.clientX - lastMouse.current.x) * 0.01;
    const dy = (e.clientY - lastMouse.current.y) * 0.005;
    accRotation.current.y += dx;
    accRotation.current.x += dy;
    // Clamp vertical rotation
    accRotation.current.x = Math.max(-0.8, Math.min(0.8, accRotation.current.x));
    setDragRotation({ ...accRotation.current });
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className="elephant-3d-wrapper"
      style={{ width: '100%', height: '540px', cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Canvas camera={{ position: [0, 1.5, 9], fov: 38 }} shadows>
        {/* CINEMATIC LIGHTING - matches illustration's top-down highlights */}
        <ambientLight intensity={0.5} color="#D6E4F0" />
        {/* Primary top key light */}
        <directionalLight
          position={[2, 8, 4]}
          intensity={2.8}
          color="#FFFFFF"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        {/* Fill light from front */}
        <pointLight position={[0, 3, 8]} intensity={1.5} color="#E8F4FD" />
        {/* Subtle back light for 3D depth */}
        <pointLight position={[-5, 2, -5]} intensity={0.6} color="#B8D4E4" />

        {/* Shadow floor plane */}
        <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.35} />
        </mesh>

        <Scene dragRotation={dragRotation} />
      </Canvas>
    </div>
  );
};

export default ElephantModel3D;