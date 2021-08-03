// import "./Output.css";

// interface OutputProps {
//   data: Array<any>;
// }

// export default function Output({ data }: OutputProps) {

  
//   return (
//     <div className="outputSection">
//       <div>
//         {data.map(function (index) {
//           if (index.entity === "PERSON") {
//             return (
//               <div key={index.name}>
//                 <div style={{ marginBottom: "10px" }}>
//                   {index.name} -{" "}
//                   <span
//                     style={{
//                       backgroundColor: "darkseagreen",
//                       padding: "3px",
//                       borderRadius: "10px",
//                     }}
//                   >
//                     {index.entity}
//                   </span>
//                 </div>
//               </div>
//             );
//           } 
//           else if (index.entity === "LOCATION") {
//             return (
//               <div key={index.name}>
//                 <div style={{ marginBottom: "10px" }}>
//                   {index.name} -{" "}
//                   <span
//                     style={{
//                       backgroundColor: "darksalmon",
//                       padding: "3px",
//                       borderRadius: "10px",
//                     }}
//                   >
//                     {index.entity}
//                   </span>
//                 </div>
//               </div>
//             );
//           }
//           else if (index.entity === "ORGANISATION") {
//             return (
//               <div key={index.name}>
//                 <div style={{ marginBottom: "10px" }}>
//                   {index.name} -{" "}
//                   <span
//                     style={{
//                       backgroundColor: "darkcyan",
//                       padding: "3px",
//                       borderRadius: "10px",
//                     }}
//                   >
//                     {index.entity}
//                   </span>
//                 </div>
//               </div>
//             );
//           }
//           else if (index.entity === "DATE") {
//             return (
//               <div key={index.name}>
//                 <div style={{ marginBottom: "10px" }}>
//                   {index.name} -{" "}
//                   <span
//                     style={{
//                       backgroundColor: "lavender",
//                       padding: "3px",
//                       borderRadius: "10px",
//                     }}
//                   >
//                     {index.entity}
//                   </span>
//                 </div>
//               </div>
//             );
//           }
//         })}
//       </div>
//     </div>
    
  
//   );
// }
