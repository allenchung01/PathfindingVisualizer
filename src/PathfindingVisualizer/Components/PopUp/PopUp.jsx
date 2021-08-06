import React from "react";

import "./PopUp.css";

export default function PopUp(props) {
  const { togglePopUp } = props;

  return (
    <div id="popup-overlay">
      <div id="popup-container">
        <button onClick={togglePopUp} id="close-button" />
        {props.children}
      </div>
    </div>
  );
}
