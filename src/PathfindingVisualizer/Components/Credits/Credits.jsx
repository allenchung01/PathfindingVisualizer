import React from "react";
import "./Credits.css";

import rocketImg from "../../Images/icons8-launch-90.png";
import flagImg from "../../Images/icons8-empty-flag-90.png";
import lineImg from "../../Images/vertical-line.png";
import weightImg from "../../Images/weight-plates.svg";
import paintbrushesImg from "../../Images/paintbrushes.svg";
import closeImg from "../../Images/close.svg";

export default function Credits() {
  return (
    <div className="credits">
      <div className="credit">
        <img src={rocketImg} alt="rocket" width="20px"></img>
        <a target="_blank" href="https://icons8.com/icon/62234/launch">
          Launch
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
      <div className="credit">
        <img src={flagImg} alt="flag" width="20px"></img>
        <a target="_blank" href="https://icons8.com/icon/100900/empty-flag">
          Empty Flag
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
      <div className="credit">
        <img src={lineImg} alt="line" width="20px"></img>
        <a target="_blank" href="https://icons8.com/icon/118838/vertical-line">
          Vertical Line
        </a>{" "}
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
      <div className="credit">
        <img src={weightImg} alt="weight" width="20px"></img>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div className="credit">
        <img src={paintbrushesImg} alt="paintbrushes" width="20px"></img>
        Icons made by{" "}
        <a href="" title="Vitaly Gorbachev">
          Vitaly Gorbachev
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <div className="credit">
        <img src={closeImg} alt="x" width="20px"></img>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/chanut" title="Chanut">
          Chanut
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}
