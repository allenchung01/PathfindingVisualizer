import React, { Component } from "react";

import Node from "./Node/Node";
import DropdownMenu from "./Buttons/DropdownMenu/DropdownMenu";
import NavigationBar from "./NavigationBar/NavigationBar";
import DrawToggle from "./Buttons/DrawToggle/DrawToggle";
import { AlgorithmTitle } from "./AlgorithmTitle/AlgorithmTitle";
import "./Buttons/Button Styles/VisualizeButton.css";
import "./Buttons/Button Styles/ClearWallsButton.css";
import { dijkstra } from "./Search Algorithms/Dijkstra";
import { breadthFirstSearch } from "./Search Algorithms/BreadthFirstSearch";
import { depthFirstSearch } from "./Search Algorithms/DepthFirstSearch";
import { aStar } from "./Search Algorithms/AStar";

import "./PathfindingVisualizer.css";

const NUM_ROWS = Math.floor(getScreenHeight() / 30);
const NUM_COLS = Math.floor(getScreenWidth() / 30);

const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const TARGET_NODE_ROW = NUM_ROWS - 2;
const TARGET_NODE_COL = NUM_COLS - 2;

const DIJKSTRA = "Dijkstra";
const BFS = "BFS";
const DFS = "DFS";
const ASTAR = "A*";

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseDown: false,
      algorithm: DIJKSTRA,
    };
  }

  componentDidMount() {
    const grid = this.createInitialGrid();
    document.body.onmouseup = this.handleOnMouseUp.bind(this);
    document.body.onmouseleave = this.handleOnMouseUp.bind(this);
    this.setState({ grid: grid });
  }

  render() {
    const { grid } = this.state;
    return (
      <div>
        <AlgorithmTitle algorithm={this.state.algorithm} />
        <NavigationBar>
          <DropdownMenu title={this.state.algorithm}>
            <button onClick={() => this.setState({ algorithm: DIJKSTRA })}>
              Dijkstra
            </button>
            <button onClick={() => this.setState({ algorithm: BFS })}>
              BFS
            </button>
            <button onClick={() => this.setState({ algorithm: DFS })}>
              DFS
            </button>
            <button onClick={() => this.setState({ algorithm: ASTAR })}>
              A*
            </button>
          </DropdownMenu>
          <button
            id="visualize-button"
            onClick={() => this.visualize(this.state.algorithm)}
          >
            Go
          </button>
          <button>Clear Path</button>
          <button id="clear-walls-button">Clear Walls</button>
          <DrawToggle />
        </NavigationBar>

        {this.displayGrid(grid)}
        {/*<div className="credits">
          <a target="_blank" href="https://icons8.com/icon/62234/launch">
            Launch
          </a>{" "}
          icon by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
          <a target="_blank" href="https://icons8.com/icon/100900/empty-flag">
            Empty Flag
          </a>{" "}
          icon by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
          <a
            target="_blank"
            href="https://icons8.com/icon/118838/vertical-line"
          >
            Vertical Line
          </a>{" "}
          icon by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
          <div>
            Icons made by{" "}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
    </div>*/}
      </div>
    );
  }

  visualize(algorithm) {
    switch (algorithm) {
      case DIJKSTRA:
        this.visualizeDijkstra();
        break;
      case BFS:
        this.visualizeBreadthFirstSearch();
        break;
      case DFS:
        this.visualizeDepthFirstSearch();
        break;
      case ASTAR:
        this.visualizeAStar();
        break;
      default:
        return;
    }
  }

  visualizeDijkstra() {
    let grid = this.copyGrid();
    this.resetNodes(grid);
    this.setState({ grid: grid }, () => {
      grid = this.copyGrid();
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
      const { visitedNodesInOrder, shortestPathReversed } = dijkstra(
        grid,
        startNode,
        targetNode,
        NUM_ROWS,
        NUM_COLS
      );
      this.animateSearch(visitedNodesInOrder, shortestPathReversed);
    });
  }

  visualizeBreadthFirstSearch() {
    let grid = this.copyGrid();
    this.resetNodes(grid);
    this.setState({ grid: grid }, () => {
      grid = this.copyGrid();
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
      const { visitedNodesInOrder, shortestPathReversed } = breadthFirstSearch(
        grid,
        startNode,
        targetNode,
        NUM_ROWS,
        NUM_COLS
      );
      this.animateSearch(visitedNodesInOrder, shortestPathReversed);
    });
  }

  visualizeDepthFirstSearch() {
    let grid = this.copyGrid();
    this.resetNodes(grid);
    this.setState({ grid: grid }, () => {
      grid = this.copyGrid();
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
      const { visitedNodesInOrder, pathReversed } = depthFirstSearch(
        grid,
        startNode,
        targetNode,
        NUM_ROWS,
        NUM_COLS
      );
      this.animateSearch(visitedNodesInOrder, pathReversed);
    });
  }

  visualizeAStar() {
    let grid = this.copyGrid();
    this.resetNodes(grid);
    this.setState({ grid: grid }, () => {
      grid = this.copyGrid();
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
      const { visitedNodesInOrder, shortestPathReversed } = aStar(
        grid,
        startNode,
        targetNode,
        NUM_ROWS,
        NUM_COLS
      );
      this.animateSearch(visitedNodesInOrder, shortestPathReversed);
    });
  }

  animateSearch(visitedNodesInOrder, pathReversed) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // Start path animation after last visited node.
        if (i === visitedNodesInOrder.length - 1) {
          this.animatePath(pathReversed);
        } else {
          if (!node.isStart && !node.isTarget) {
            // Normally shouldn't do this, but had to to optimize performance.
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-visited";
          }
        }
      }, 5 * i);
    }
  }

  animatePath(pathReversed) {
    const lines = this.pathToLines(pathReversed);
    let startRow = START_NODE_ROW;
    let startCol = START_NODE_COL;
    for (let i = pathReversed.length - 1; i >= 0; i--) {
      startRow = pathReversed[i].row;
      startCol = pathReversed[i].col;
      setTimeout(
        () => this.moveRocketShip(pathReversed, lines, i),
        3000 * ((pathReversed.length - i) / pathReversed.length)
      );
    }
  }

  moveRocketShip(pathReversed, lines, i) {
    const node = pathReversed[i];
    if (!node.isStart) {
      const prevNode = pathReversed[i + 1];
      const grid = this.copyGrid();
      grid[prevNode.row][prevNode.col].isStart = false;
      grid[prevNode.row][prevNode.col].isPath = true;
      grid[prevNode.row][prevNode.col].direction = lines[i + 1];
      grid[node.row][node.col].isStart = true;
      if (grid[node.row][node.col].isTarget) {
        grid[node.row][node.col].isTargetReached = true;
      }
      this.setState({ grid: grid });
    }
  }

  // Returns an array of lines, given a path of nodes.
  pathToLines(pathReversed) {
    const lines = [];
    const directions = [];
    directions.push("none");
    for (let i = 1; i < pathReversed.length; i++) {
      let prevNode = pathReversed[i - 1];
      let currNode = pathReversed[i];
      let dRow = prevNode.row - currNode.row;
      let dCol = currNode.col - prevNode.col;
      const direction =
        dCol === 1
          ? "right"
          : dCol === -1
          ? "left"
          : dRow === 1
          ? "up"
          : dRow === -1
          ? "down"
          : "";
      directions.push(direction);
      const line =
        direction === "right" && directions[i - 1] === "none"
          ? "horizontal"
          : direction === "right" && directions[i - 1] === "right"
          ? "horizontal"
          : direction === "right" && directions[i - 1] === "up"
          ? "ul"
          : direction === "right" && directions[i - 1] === "down"
          ? "bl"
          : direction === "left" && directions[i - 1] === "none"
          ? "horizontal"
          : direction === "left" && directions[i - 1] === "left"
          ? "horizontal"
          : direction === "left" && directions[i - 1] === "up"
          ? "ur"
          : direction === "left" && directions[i - 1] === "down"
          ? "br"
          : direction === "up" && directions[i - 1] === "none"
          ? "vertical"
          : direction === "up" && directions[i - 1] === "up"
          ? "vertical"
          : direction === "up" && directions[i - 1] === "left"
          ? "bl"
          : direction === "up" && directions[i - 1] === "right"
          ? "br"
          : direction === "down" && directions[i - 1] === "none"
          ? "vertical"
          : direction === "down" && directions[i - 1] === "down"
          ? "vertical"
          : direction === "down" && directions[i - 1] === "left"
          ? "ul"
          : direction === "down" && directions[i - 1] === "right"
          ? "ur"
          : "";
      lines.push(line);
    }
    lines.push("landing-pad");
    return lines;
  }

  // Handles onMouseDown event on node at given row and column.
  handleOnMouseDown(row, col) {
    const grid = this.copyGrid();
    const node = grid[row][col];
    node.isWall = !node.isWall;
    this.setState({ grid: grid, mouseDown: true });
  }

  handleOnMouseUp() {
    if (this.state.mouseDown === true) {
      this.setState({ mouseDown: false });
    }
  }

  handleOnMouseEnter(row, col) {
    if (this.state.mouseDown === true) {
      const grid = this.copyGrid();
      const node = grid[row][col];
      node.isWall = !node.isWall;
      this.setState({ grid: grid });
    }
  }

  // Create a 2D array of node objects.
  createInitialGrid() {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COLS; col++) {
        const currNode = new NodeObj(col, row);
        currentRow.push(currNode);
      }
      grid.push(currentRow);
    }
    return grid;
  }

  // Map the grid to Node components that are displayed.
  displayGrid(nodes) {
    return (
      <div className="grid">
        {nodes.map((row, rowIndex) => {
          return (
            <div className="row" key={rowIndex}>
              {row.map((node, nodeIndex) => {
                return (
                  <Node
                    draggable="false"
                    key={nodeIndex}
                    isStart={node.isStart}
                    isTarget={node.isTarget}
                    isWall={node.isWall}
                    isVisited={node.isVisited}
                    isPath={node.isPath}
                    row={node.row}
                    col={node.col}
                    direction={node.direction}
                    isTargetReached={node.isTargetReached}
                    handleOnMouseDown={this.handleOnMouseDown.bind(this)}
                    handleOnMouseUp={this.handleOnMouseUp.bind(this)}
                    handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  resetNodes(grid) {
    for (const row of grid) {
      for (const node of row) {
        // We have to reset isVisited, and isPath of nodes the same way we set them.
        if (!node.isWall && !node.isStart && !node.isTarget) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
        }
        node.isVisited = false;
        node.isPath = false;
        node.previousNode = null;
        node.distance = Infinity;
        node.isStart =
          node.row === START_NODE_ROW && node.col === START_NODE_COL;
        node.isTarget =
          node.row === TARGET_NODE_ROW && node.col === TARGET_NODE_COL;
        node.isTargetReached = false;
      }
    }
  }

  clearPath() {
    const grid = this.copyGrid();
    this.resetNodes(grid);
    this.setState({ grid: grid });
  }

  clearWalls() {
    const grid = this.copyGrid();
    for (const row of grid) {
      for (const node of row) {
        if (node.isWall) {
          node.isWall = false;
        }
      }
    }
    this.setState({ grid: grid });
  }

  copyGrid() {
    const grid = this.state.grid;
    const copiedGrid = [];
    for (const row of grid) {
      const copiedRow = row.map((node) => {
        const copiedNode = Object.assign({}, node);
        return copiedNode;
      });
      copiedGrid.push(copiedRow);
    }
    return copiedGrid;
  }
}

// Node object constructor.
function NodeObj(col, row) {
  this.col = col;
  this.row = row;
  this.isStart = row === START_NODE_ROW && col === START_NODE_COL;
  this.isTarget = row === TARGET_NODE_ROW && col === TARGET_NODE_COL;
  this.isVisited = false;
  this.isWall = false;
  // Distance from start node.
  this.distance = Infinity;
  // Previous node used to trace path.
  this.previousNode = null;
  this.direction = null;
  this.isTargetReached = false;
}

// Function to get the width of the browser window.
function getScreenWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getScreenHeight() {
  return window.innerHeight;
}
