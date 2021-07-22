import React, { useState } from "react";
import "./DrawToggle.css";

const WALLS = "Walls";
const WEIGHTS = "Weights";

export default function Toggle(props) {
  const { selected } = props;

  return (
    <div className="toggle">
      <button onClick={() => {}}>Walls</button>
      <button onClick={() => {}}>Weights</button>
    </div>
  );
}
