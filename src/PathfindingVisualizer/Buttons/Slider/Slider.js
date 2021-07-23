import React, { useState } from "react";
import "./Slider.css";
import weightImg from "../../Images/weight-plates.svg";
import Hint from "../../Hints/Hint";

export default function Slider(props) {
  const [isHintDisplayed, setIsHintDisplayed] = useState(false);
  const { value, setValue } = props;

  const toggleHint = () => {
    setIsHintDisplayed(!isHintDisplayed);
  };

  return (
    <div id="weight-slider-section">
      {isHintDisplayed ? <Hint message="Weight Value" /> : null}
      <img
        id="weightImg"
        src={weightImg}
        width="14"
        height="14"
        onMouseEnter={toggleHint}
        onMouseLeave={toggleHint}
      />
      <div className="slider-container">
        <input
          className="slider"
          type="range"
          min={1}
          max={20}
          value={value}
          onChange={(e) => {
            setValue(e.target.valueAsNumber);
          }}
        />
        <p id="value">{value}</p>
      </div>
    </div>
  );
}
