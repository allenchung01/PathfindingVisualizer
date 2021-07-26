import React from "react";
import "./Hint.css";

export default function Hint(props) {
  const { message } = props;
  return <div className="hint-container">{message}</div>;
}
