import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "drei";
import "./App.scss";
import { Mesh } from "three";
import { useSpring, a } from "react-spring/three";
import { LightsGroup } from "./Lights";

const Box = () => {
  const mesh = useRef<Mesh>();
  const [hover, setHover] = useState(false);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
    color: hover ? "yellow" : "hotpink",
  });

  return (
    <a.mesh
      ref={mesh}
      position={[0, 1, 1]}
      castShadow
      scale={props.scale}
      onClick={() => setExpand(!expand)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshMatcapMaterial
        attach="material"
        color={props.color}
      ></a.meshMatcapMaterial>
    </a.mesh>
  );
};

const Plane = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeBufferGeometry
        attach="geometry"
        args={[100, 100]}
      ></planeBufferGeometry>
      <shadowMaterial attach="material" opacity={0.3}></shadowMaterial>
    </mesh>
  );
};
function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [-5, 2, 10],
          fov: 60,
        }}
        shadowMap
      >
        <LightsGroup></LightsGroup>
        <Box></Box>
        <Plane></Plane>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
