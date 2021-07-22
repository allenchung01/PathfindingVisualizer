import React from "react";
import "./NavigationBar.css";

export default function NavigationBar(props) {
  return <div className="navigation-bar">{props.children}</div>;
}
