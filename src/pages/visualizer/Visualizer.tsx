import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import "./Visualizer.css";
interface Props {
  height: number;
  position_x: number;
  position_z: number;
  color: string;
}

const Box: React.FC<Props> = ({ height, position_x, position_z, color }) => {
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
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  );
};

const Plane = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[300, 300]} />
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
    [5, 3.5, 1.5],

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

  const options: any = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  };

  const [inputData, setInputData] = useState([]);

  useEffect(() => {
    fetch("/input", options)
      .then((res) => res.json())
      .then((data) => {
        setInputData(data);
      });
  }, []);

  console.log("SAVED FROM VISULALIZER", inputData);

  const displayArray: any[] = [];

  let x_coord = 0;
  let z_coord = 0;
  let color;

  for (let i of inputData) {
    if (i.entity === "B-LOC" || i.entity === "I-LOC") {
      color = "#dd9c22";
    } else if (i.entity === "B-PER" || i.entity === "I-PER") {
      color = "#79bb14";
    } else if (i.entity === "B-ORG" || i.entity === "I-ORG") {
      color = "#b8216d";
    } else {
      color = "#2148bd";
    }
    displayArray.push([i.count, color, (x_coord += 1.5), (z_coord += 1.5)]);
  }

  console.log("Display Array: ", displayArray);

  return (
    <div style={{ backgroundColor: "black", width: "100vw", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 20, 10]} angle={0.3} castShadow />
        <Text color="white" anchorX="center" anchorY="middle">
          LOCATION
        </Text>
        <Physics>
          {displayArray.map((i) => {
            return (
              <Box
                height={i[0]}
                color={i[1]}
                position_x={i[2]}
                position_z={i[3]}
              />
            );
          })}
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Visualizer;
