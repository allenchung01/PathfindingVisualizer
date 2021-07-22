import React, { useState } from "react";
import "./DrawToggle.css";
import brushesImg from "../../Images/paintbrushes.svg";

const WALLS = "Walls";
const WEIGHTS = "Weights";

export default function Toggle(props) {
  const [selected, setSelected] = useState(WALLS);
  const { setDrawMode } = props;

  return (
    <div id="container">
      <img id="brushes-img" src={brushesImg} width="14" height="14" />
      <div className="toggle">
        <button
          onClick={() => {
            setSelected(WALLS);
            setDrawMode(WALLS);
          }}
          className={selected === WALLS ? "selected" : "unselected"}
        >
          Walls
        </button>
        <button
          onClick={() => {
            setSelected(WEIGHTS);
            setDrawMode(WEIGHTS);
          }}
          className={selected === WEIGHTS ? "selected" : "unselected"}
        >
          Weights
        </button>
      </div>
    </div>
  );
}
