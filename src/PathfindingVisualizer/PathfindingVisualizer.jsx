import React, { Component } from "react";

import Node from "./Node/Node";
import DropdownMenu from "./Buttons/DropdownMenu/DropdownMenu";
import NavigationBar from "./NavigationBar/NavigationBar";
import DrawToggle from "./Buttons/DrawToggle/DrawToggle";
import Slider from "./Buttons/Slider/Slider";
import { AlgorithmTitle } from "./AlgorithmTitle/AlgorithmTitle";
import "./Buttons/Button Styles/VisualizeButton.css";
import { dijkstra } from "./Search Algorithms/Dijkstra";
import { breadthFirstSearch } from "./Search Algorithms/BreadthFirstSearch";
import { depthFirstSearch } from "./Search Algorithms/DepthFirstSearch";
import { aStar } from "./Search Algorithms/AStar";

import "./PathfindingVisualizer.css";

const NUM_ROWS = Math.floor(getScreenHeight() / 30);
const NUM_COLS = Math.floor(getScreenWidth() / 30);

const START_NODE_ROW = 5;
const START_NODE_COL = 1;
const TARGET_NODE_ROW = NUM_ROWS - 2;
const TARGET_NODE_COL = NUM_COLS - 2;

const DIJKSTRA = "Dijkstra";
const BFS = "BFS";
const DFS = "DFS";
const ASTAR = "A*";

const WALLS = "Walls";
const WEIGHTS = "Weights";

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      startNodeRow: START_NODE_ROW,
      startNodeCol: START_NODE_COL,
      targetNodeRow: TARGET_NODE_ROW,
      targetNodeCol: TARGET_NODE_COL,
      mouseDown: false,
      algorithm: DIJKSTRA,
      drawMode: WALLS,
      movingStart: false,
      movingTarget: false,
      movingLaunchPad: false,
      weightValue: 5,
      launchPadRow: null,
      launchPadCol: null,
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
          <button onClick={this.clearPath.bind(this)}>Clear Path</button>
          <button onClick={this.clearWalls.bind(this)}>Clear Walls</button>
          <button
            onClick={this.clearWeights.bind(this)}
            style={{ marginRight: "100px" }}
          >
            Clear Weights
          </button>
          <DrawToggle
            setDrawMode={(mode) => {
              this.setState({ drawMode: mode });
            }}
          />
          <Slider
            value={this.state.weightValue}
            setValue={this.setWeightValue.bind(this)}
          />
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
    </div>
    <div>Icons made by <a href="" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
      </div>
    );
  }

  setWeightValue(value) {
    this.setState({ weightValue: value });
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

  // Used to disply disjkstra when moving launch pad,
  // instead of fully animating dijkstra.
  displayDijkstra() {
    let grid = this.copyGrid();
    const startNode = grid[this.state.launchPadRow][this.state.launchPadCol];
    const targetNode = grid[this.state.targetNodeRow][this.state.targetNodeCol];
    const { shortestPathReversed } = dijkstra(
      grid,
      startNode,
      targetNode,
      NUM_ROWS,
      NUM_COLS,
      this.state.weightValue
    );

    const lines = this.pathToLines(shortestPathReversed);

    grid = this.copyGrid();

    for (let i = 0; i < shortestPathReversed.length; i++) {
      const row = shortestPathReversed[i].row;
      const col = shortestPathReversed[i].col;
      grid[row][col].direction = lines[i];
      grid[row][col].isPath = true;
    }
    this.setState({ grid: grid });
  }

  visualizeDijkstra() {
    let grid = this.copyGrid();
    this.resetNodes(grid);
    this.setState({ grid: grid }, () => {
      grid = this.copyGrid();
      const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
      const targetNode =
        grid[this.state.targetNodeRow][this.state.targetNodeCol];
      const { visitedNodesInOrder, shortestPathReversed } = dijkstra(
        grid,
        startNode,
        targetNode,
        NUM_ROWS,
        NUM_COLS,
        this.state.weightValue
      );
      this.animateSearch(visitedNodesInOrder, shortestPathReversed);
    });
  }

  visualizeBreadthFirstSearch() {
    let grid = this.copyGrid();
    this.resetNodes(grid);
    this.setState({ grid: grid }, () => {
      grid = this.copyGrid();
      const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
      const targetNode =
        grid[this.state.targetNodeRow][this.state.targetNodeCol];
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
      const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
      const targetNode =
        grid[this.state.targetNodeRow][this.state.targetNodeCol];
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
      const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
      const targetNode =
        grid[this.state.targetNodeRow][this.state.targetNodeCol];
      const { visitedNodesInOrder, shortestPathReversed } = aStar(
        grid,
        startNode,
        targetNode,
        NUM_ROWS,
        NUM_COLS,
        this.state.weightValue
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
            const element = document.getElementById(
              `node-${node.row}-${node.col}`
            );
            element.classList.remove("unvisited");
            element.classList.add("visited");
          }
        }
      }, 5 * i);
    }
  }

  animatePath(pathReversed) {
    const lines = this.pathToLines(pathReversed);
    let startRow = this.state.startNodeRow;
    let startCol = this.state.startNodeCol;
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
      if (grid[prevNode.row][prevNode.col].direction === "landing-pad") {
        this.setState({
          grid: grid,
          launchPadRow: prevNode.row,
          launchPadCol: prevNode.col,
        });
        return;
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
    // Start moving target node.
    if (node.isTarget) {
      this.setState({ movingTarget: true, mouseDown: true });
      return;
    }
    // Start moving launch pad.
    if (node.isPath && node.direction === "landing-pad") {
      this.setState({ movingLaunchPad: true, mouseDown: true });
      return;
    }
    // Start moving start node.
    if (node.isStart) {
      this.setState({ movingStart: true, mouseDown: true });
      return;
    }
    // Start drawing walls or weights no the node.
    switch (this.state.drawMode) {
      case WALLS:
        node.isWall = !node.isWall;
        node.isWeight = false;
        this.setState({ grid: grid, mouseDown: true });
        break;
      case WEIGHTS:
        node.isWeight = !node.isWeight;
        node.isWall = false;
        this.setState({ grid: grid, mouseDown: true });
        break;
      default:
        return;
    }
  }

  handleOnMouseUp() {
    if (this.state.mouseDown === true) {
      this.setState({
        mouseDown: false,
        movingStart: false,
        movingTarget: false,
        movingLaunchPad: false,
      });
    }
  }

  handleOnMouseEnter(row, col) {
    if (this.state.mouseDown === true) {
      const grid = this.copyGrid();
      const node = grid[row][col];
      // Move target node.
      if (this.state.movingTarget) {
        const prevTarget =
          grid[this.state.targetNodeRow][this.state.targetNodeCol];
        prevTarget.isTarget = false;
        node.isTarget = true;
        this.setState({ grid: grid, targetNodeRow: row, targetNodeCol: col });
        return;
      }
      // Move launch pad.
      if (this.state.movingLaunchPad) {
        // Remove path.
        for (const row of grid) {
          for (var node_ of row) {
            node_.isPath = false;
            node_.direction = null;
            node_.isVisited = false;
          }
        }
        // Move launch pad.
        const prevLaunchPad =
          grid[this.state.launchPadRow][this.state.launchPadCol];
        prevLaunchPad.isPath = false;
        prevLaunchPad.direction = null;
        node.isPath = true;
        node.direction = "landing-pad";
        // Adjust start node.
        const prevStart =
          grid[this.state.startNodeRow][this.state.startNodeCol];
        prevStart.isStart = false;
        node.isStart = true;
        // Set state.
        this.setState(
          {
            grid: grid,
            launchPadRow: row,
            launchPadCol: col,
            startNodeRow: row,
            startNodeCol: col,
          },
          // ReDraw path.
          this.displayDijkstra
        );
        return;
      }
      // Move start node.
      if (this.state.movingStart) {
        const prevStart =
          grid[this.state.startNodeRow][this.state.startNodeCol];
        prevStart.isStart = false;
        node.isStart = true;
        this.setState({ grid: grid, startNodeRow: row, startNodeCol: col });
        return;
      }

      switch (this.state.drawMode) {
        case WALLS:
          node.isWall = !node.isWall;
          node.isWeight = false;
          this.setState({ grid: grid });
          break;
        case WEIGHTS:
          node.isWeight = !node.isWeight;
          node.isWall = false;
          this.setState({ grid: grid });
          break;
        default:
          return;
      }
    }
  }

  // Create a 2D array of node objects.
  createInitialGrid() {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COLS; col++) {
        const currNode = new NodeObj(col, row);
        if (
          row === this.state.startNodeRow &&
          col === this.state.startNodeCol
        ) {
          currNode.isStart = true;
        } else if (
          row === this.state.targetNodeRow &&
          col === this.state.targetNodeCol
        ) {
          currNode.isTarget = true;
        }
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
                    isWeight={node.isWeight}
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
        if (!node.isWall && !node.isStart && !node.isTarget && !node.isWeight) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
        } else if (node.isWeight) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-weight unvisited";
        }
        node.isVisited = false;
        node.isPath = false;
        node.previousNode = null;
        node.distance = Infinity;
        node.isStart =
          node.row === this.state.startNodeRow &&
          node.col === this.state.startNodeCol;
        node.isTarget =
          node.row === this.state.targetNodeRow &&
          node.col === this.state.targetNodeCol;
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

  clearWeights() {
    const grid = this.copyGrid();
    for (const row of grid) {
      for (const node of row) {
        if (node.isWeight) {
          node.isWeight = false;
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
  this.isStart = false;
  this.isTarget = false;
  this.isVisited = false;
  this.isWall = false;
  this.isWeight = false;
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
