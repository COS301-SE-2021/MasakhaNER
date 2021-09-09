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
  const data: any[] = [
    // front
    [9, "#dd9c22", -4, 1.5],
    [4, "#dd9c22", -2.5, 1.5],
    [2, "#dd9c22", -1, 1.5],
    [12, "#dd9c22", 0.5, 1.5],
    [8, "#dd9c22", 2, 1.5],
    [5, "#dd9c22", 3.5, 1.5],

    // middle
    [3, "#79bb14", -5.5, 0],
    [5, "#79bb14", -4, 0],
    [12, "#79bb14", -2.5, 0],
    [4, "#79bb14", -1, 0],
    [10, "#79bb14", 0.5, 0],
    [14, "#79bb14", 2, 0],
    [10, "#79bb14", 3.5, 0],

    // back
    [3, "#2148bd", -4, -1.5],
    [8, "#2148bd", -2.5, -1.5],
    [5, "#2148bd", -1, -1.5],
    [9, "#2148bd", 0.5, -1.5],
    [14, "#2148bd", 2, -1.5],

    // further back
    [3, "#b8216d", -4, -3],
    [8, "#b8216d", -2.5, -3],
    [5, "#b8216d", -1, -3],
    [9, "#b8216d", 0.5, -3],
    [14, "#b8216d", 2, -3],
    [5, "#b8216d", 3.5, -3],
    [3, "#b8216d", 5, -3],
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

  return (
    <div style={{ backgroundColor: "black", width: "100vw", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 20, 10]} angle={0.3} castShadow />
        {/* <Text color="white" anchorX="center" anchorY="middle">
          LOCATION
        </Text> */}
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
