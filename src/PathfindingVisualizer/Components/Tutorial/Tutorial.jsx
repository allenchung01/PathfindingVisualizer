import React, { useState } from "react";

import "./Tutorial.css";

export default function Tutorial(props) {
  const { exitTutorial } = props;
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Welcome!",
      description:
        "This is my pathfinding visualizer! Click continue to view the tutorial.",
    },
    { title: "Title 2", description: "Description 2" },
    { title: "Title 3", description: "Description 3" },
  ];

  function nextPage() {
    // Increment page until last page.
    if (page + 1 < pages.length) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    // Decrement page until first page.
  }

  return (
    <div id="tutorial-container">
      <h2 id="tutorial-title">{pages[page].title}</h2>
      <p id="tutorial-description">{pages[page].description}</p>
      <div id="tutorial-buttons">
        <button id="skip-button" onClick={exitTutorial}>
          {page == 0 ? "Skip Tutorial" : "Previous"}
        </button>
        <button id="continue-button" onClick={nextPage}>
          {page == 0 ? "Continue" : "Next"}
        </button>
      </div>
    </div>
  );
}
