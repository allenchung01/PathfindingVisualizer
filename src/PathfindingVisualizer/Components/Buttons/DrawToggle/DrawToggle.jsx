import React, { useState } from "react";
import "./DrawToggle.css";
import brushesImg from "../../../Images/paintbrushes.svg";
import Hint from "../../Hints/Hint";

const WALLS = "Walls";
const WEIGHTS = "Weights";

export default function Toggle(props) {
  const [selected, setSelected] = useState(WALLS);
  const [isHintDisplayed, setIsHintDisplayed] = useState(false);
  const { setDrawMode } = props;

  const toggleHint = () => {
    setIsHintDisplayed(!isHintDisplayed);
  };

  return (
    <div id="container">
      {isHintDisplayed ? <Hint message="Draw Mode" /> : null}
      <img
        id="brushes-img"
        src={brushesImg}
        width="14"
        height="14"
        onMouseEnter={toggleHint}
        onMouseLeave={toggleHint}
      />
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
