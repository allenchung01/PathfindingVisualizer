import React, { useState } from "react";
import "./DropdownMenu.css";

export default function DropdownMenu(props) {
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);
  const { title } = props;

  const onClick = () => {
    setDropdownIsVisible(!dropdownIsVisible);
  };

  return (
    <div className="dropdown-menu">
      <button id="button" onClick={onClick}>
        {title}
      </button>
      {dropdownIsVisible ? (
        <ul onClick={() => setDropdownIsVisible(false)}>
          {props.children.map((child, index) => {
            return <li key={index}>{child}</li>;
          })}
        </ul>
      ) : null}
    </div>
  );
}
