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
    [1, -4, 1.5],
    [2, -2.5, 0],
    [3, -1, -1.5],
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 15, 10]} angle={0.3} castShadow />
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
