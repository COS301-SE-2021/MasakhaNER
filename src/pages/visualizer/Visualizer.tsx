import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { OrbitControls, Stars, Sky } from "@react-three/drei";
import "./Visualizer.css";
interface Props {
  height: number;
  position_x: number;
  position_z: number;
}

const Box: React.FC<Props> = ({ height, position_x, position_z }) => {
  const [ref, api] = useBox(() => ({
    mass: 0.1,
    position: [position_x, 1, position_z],
  }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 0, 0);
      }}
      ref={ref}
      position={[0, 0, 0]}
    >
      <boxGeometry args={[1, height, 1]} />
      <meshLambertMaterial attach="material" color="green" />
    </mesh>
  );
};

const Plane = (props: JSX.IntrinsicElements["mesh"]) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
};

const Visualizer = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 15, 10]} angle={0.3} castShadow />
        <Physics>
          <Box height={1} position_x={-4} position_z={0} />
          <Box height={4} position_x={-2.5} position_z={0} />
          <Box height={9} position_x={-1} position_z={0} />
          <Box height={2} position_x={0.5} position_z={0} />
          <Box height={1} position_x={2} position_z={0} />
          <Box height={7} position_x={3.5} position_z={0} />
          <Box height={3} position_x={-4} position_z={-1.5} />
          <Box height={1} position_x={-2.5} position_z={-1.5} />
          <Box height={5} position_x={-1} position_z={-1.5} />
          <Box height={1} position_x={0.5} position_z={-1.5} />
          <Box height={4} position_x={2} position_z={-1.5} />
          <Box height={3} position_x={3.5} position_z={-1.5} />
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Visualizer;
