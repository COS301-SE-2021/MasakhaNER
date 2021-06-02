import "./Output.css";
import { FaCopy } from "react-icons/fa";

interface OutputProps {
  data: Array<any>;
}

export default function Output({ data }: OutputProps) {
  return (
    <div className="outputSection">
      <div>
        {data.map((index) => (
          <div key={index.name}>
            <p>
              {index.name} - {index.entity}
            </p>
          </div>
        ))}
      </div>
      <div className="outputButton">
        {/* <button className="btn btn-light">Give FeedBack on Translation</button> */}
        {/* <button className="btn btn-light">
          <FaCopy />
        </button> */}
      </div>
    </div>
  );
}
