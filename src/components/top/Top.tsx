import React from "react";
import "./Top.css";

export default function Top() {
  return (
    <div className="top">
      <div className="from">
        <label htmlFor="select-from">From: </label>
        <select id="select-from">
          <option value="Engilish">Engilish</option>
          <option value="Shona">Shona</option>
          <option value="Yoruba">Yoruba</option>
        </select>
      </div>
      <div className="to">
        <label htmlFor="select-to">To: </label>
        <select id="select-to">
          <option value="Swahili">Swahili</option>
          <option value="Hausa">Hausa</option>
          <option value="Fula">Fula</option>
        </select>
      </div>
    </div>
  );
}
