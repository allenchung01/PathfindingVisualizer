import React, { useState } from "react";
import "./AlgorithmTitle.css";

const DIJKSTRA = "Dijkstra";
const BFS = "BFS";
const DFS = "DFS";
const ASTAR = "A*";

export default function AlgorithmTitle(props) {
  const { algorithm } = props;
  const [infoIsDisplayed, setInfoIsDisplayed] = useState(false);

  const dijkstraInfo =
    "Dijkstra's Algorithm finds the shortest path between between two given nodes.".concat(
      " It does this by taking into account the weights of edges and using a priority queue that sorts neighboring nodes by distance.".concat(
        " It then visits those nodes in ascending order of distance.".concat(
          " In this visualization, nodes have a distance of 1 and weights have a distance of 5."
        )
      )
    );
  const bfsInfo =
    "Breadth First Search finds the shortest path between between two given nodes.".concat(
      " It starts by adding neighboring nodes to a queue.".concat(
        " It then pops the first node from the queue, visits it, and adds its neighbors to the queue."
          .concat(" This process repeats until the target node is reached.")
          .concat(" Breadth First Search does not take weights into account.")
      )
    );
  const dfsInfo =
    "Depth First Search finds a path between between two given nodes, but it does not guarentee the shortest path.".concat(
      " It does this by recursively visiting neighboring nodes instead of using a queue.".concat(
        " This means that deep nodes will be reached before nearby nodes.".concat(
          " Depth First Search does not take weights into account."
        )
      )
    );
  const aStarInfo =
    "A* Search Algorithm finds the shortest path between between two given nodes.".concat(
      " It also has knowledge of where the end node is beforehand.".concat(
        " It uses a queue similar to Dijkstra's algorithm, but instead assigns scores to neighboring nodes based on distance to the node along with estimated distance to the target node.".concat(
          " In this visualization, nodes have a distance of 1 and weights have a distance of 5."
        )
      )
    );

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
