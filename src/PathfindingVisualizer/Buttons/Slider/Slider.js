import React, { useState } from "react";
import "./Slider.css";
import weightImg from "../../Images/weight-plates.svg";

export default function Slider(props) {
  const { value, setValue } = props;

  return (
    <div>
      <img id="weightImg" src={weightImg} width="14" height="14" />
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
