import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { OrbitControls, Stars } from "@react-three/drei";
import "./Visualizer.css";
interface Props {
  height: number;
}

const Box: React.FC<Props> = ({height}) => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[3000, 2, 0]}
    >
      <boxGeometry args={[1, height, 1]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
};

const Plane = (props: JSX.IntrinsicElements["mesh"]) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="white" />
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
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Physics>
          <Box height={1} />
          <Box height={1} />
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Visualizer;
