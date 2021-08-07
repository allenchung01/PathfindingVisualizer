import React, { useState } from "react";

import "./Tutorial.css";
import rocketImg from "../../Images/icons8-launch-90.png";

export default function Tutorial(props) {
  const { exitTutorial } = props;
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Welcome!",
      description:
        "This is my pathfinding visualizer. Select an algorithm, draw some walls or weights, and watch as the rocket finds a path to the flag.",
    },
    {
      title: "Rules",
      description:
        "The rocket may only move into adjacent, non-diagonal squares. Moves are a distance of 1 unless occupied by a weight with a specified distance. The rocket may not move through walls.",
    },
    {
      title: "Selecting an Algorithm",
      description:
        "Use the dropdown in the upper left corner of the screen to select an algorithm. Hover over the info icon in the lower left of the screen to view more information about the algorithm. Click on 'Go' when you are ready visualize.",
    },
    {
      title: "Drawing Walls and Weights",
      description:
        "Use the 'Draw Mode' toggle at the top of the screen to switch between wall mode and weight mode. Drag across the squares on the screen to draw using the selected mode. Walls, paths, and weights, can be cleared using the buttons to the left of the 'Draw Mode' toggle.",
    },
    {
      title: "Adjusting Weight Values",
      description:
        "Use the 'Weight Value' slider at the top of the screen to adjust the distance it will take for the rocket to pass through weights. Not all algorithms take weights into account.",
    },
    {
      title: "Moving Start and End Nodes.",
      description:
        "The rocket and flag can be moved by dragging them across the grid. Dragging either of these nodes after a path has already been discovered will auto update the path to reflect the new positions.",
    },
  ];

  function nextPage() {
    // Increment page until last page.
    if (page + 1 < pages.length) {
      setPage(page + 1);
    } else {
      exitTutorial();
    }
  }

  function prevPage() {
    // Decrement page until first page.
    if (page - 1 >= 0) {
      setPage(page - 1);
    }
  }

  return (
    <div id="tutorial-container">
      <h2 id="tutorial-title">{pages[page].title}</h2>

      {page == 0 ? <img id="page0-img" src={rocketImg} alt="rocket" /> : null}
      {page == 1 ? (
        <div id="rules-grid">
          <div id="top-node" className="rules-node">
            <p>1</p>
          </div>
          <div id="left-node" className="rules-node">
            1
          </div>
          <div id="center-node" className="rules-node"></div>
          <div id="right-node" className="rules-node"></div>
          <div id="bottom-node" className="rules-node">
            1
          </div>
        </div>
      ) : null}

      <p id="tutorial-description">{pages[page].description}</p>
      <div id="tutorial-buttons">
        <button id="skip-button" onClick={page == 0 ? exitTutorial : prevPage}>
          {page == 0 ? "Skip Tutorial" : "Previous"}
        </button>
        <button id="continue-button" onClick={nextPage}>
          {page == 0
            ? "Continue"
            : page == pages.length - 1
            ? "End Tutorial"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
