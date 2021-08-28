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
  // [height, position_x, position_z]
  const data = [
    // front
    [9, -4, 1.5],
    [4, -2.5, 1.5],
    [2, -1, 1.5],
    [12, 0.5, 1.5],
    [8, 2, 1.5],

    // middle
    [3, -5.5, 0],
    [5, -4, 0],
    [12, -2.5, 0],
    [4, -1, 0],
    [10, 0.5, 0],
    [14, 2, 0],
    [10, 3.5, 0],

    // back
    [3, -4, -1.5],
    [8, -2.5, -1.5],
    [5, -1, -1.5],
    [9, 0.5, -1.5],
    [14, 2, -1.5],
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 20, 10]} angle={0.3} castShadow />
        <Physics>
          {data.map((i) => {
            return <Box height={i[0]} position_x={i[1]} position_z={i[2]} />;
          })}
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Visualizer;
