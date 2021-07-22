import React, { useState } from "react";
import "./AlgorithmTitle.css";

const DIJKSTRA = "Dijkstra";
const BFS = "BFS";
const DFS = "DFS";
const ASTAR = "A*";

export function AlgorithmTitle(props) {
  const { algorithm } = props;
  const [infoIsDisplayed, setInfoIsDisplayed] = useState(false);

  const dijkstraInfo =
    "Dijkstra's Algorithm finds the shortest path between between two given nodes. It does this by...";
  const bfsInfo =
    "Breadth First Search finds the shortest path between between two given nodes. It does this by...";
  const dfsInfo =
    "Depth First Search finds a path between between two given nodes, but id does not guarentee the shortest path. It does this by...";
  const aStarInfo =
    "A* Search Algorithm finds the shortest path between between two given nodes. It does this by...";

  const getInfo = (algorithm) => {
    switch (algorithm) {
      case DIJKSTRA:
        return dijkstraInfo;
      case BFS:
        return bfsInfo;
      case DFS:
        return dfsInfo;
      case ASTAR:
        return aStarInfo;
    }
  };

  return (
    <div id="bottom-left-fixed">
      <h1 id="big-algorithm-name">{algorithm}</h1>
      <div
        onMouseEnter={() => setInfoIsDisplayed(true)}
        onMouseLeave={() => setInfoIsDisplayed(false)}
        className="info-icon"
      />
      {infoIsDisplayed ? (
        <p className="info-popup">{getInfo(algorithm)}</p>
      ) : null}
    </div>
  );
}
