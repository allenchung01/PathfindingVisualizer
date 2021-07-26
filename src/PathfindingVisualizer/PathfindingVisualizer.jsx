import React, { Component } from "react";

// Components
import Node from "./Components/Node/Node";
import DropdownMenu from "./Components/Buttons/DropdownMenu/DropdownMenu";
import NavigationBar from "./Components/Navigation/NavigationBar/NavigationBar";
import DrawToggle from "./Components/Buttons/DrawToggle/DrawToggle";
import Slider from "./Components/Buttons/Slider/Slider";
import AlgorithmTitle from "./Components/AlgorithmTitle/AlgorithmTitle";
import Credits from "./Components/Credits/Credits";
import NavigationSection from "./Components/Navigation/NavigationSection";

// Functions
import { dijkstra } from "./Search Algorithms/Dijkstra";
import { breadthFirstSearch } from "./Search Algorithms/BreadthFirstSearch";
import { depthFirstSearch } from "./Search Algorithms/DepthFirstSearch";
import { aStar } from "./Search Algorithms/AStar";
import { getScreenWidth, getScreenHeight } from "./Functions/ScreenFunctions";
import {
  copyGrid,
  clearWeights,
  clearPath,
  clearWalls,
  createInitialGrid,
  resetNodes,
} from "./Functions/GridFunctions";

// CSS
import "./Components/Buttons/Button Styles/VisualizeButton.css";
import "./PathfindingVisualizer.css";

const NODE_WIDTH = 30;

const NUM_ROWS = Math.floor(getScreenHeight() / NODE_WIDTH);
const NUM_COLS = Math.floor(getScreenWidth() / NODE_WIDTH);

const INITIAL_START_ROW = 5;
const INITIAL_START_COL = 1;
const INITIAL_TARGET_ROW = NUM_ROWS - 2;
const INITIAL_TARGET_COL = NUM_COLS - 2;

const ALGORITHM = {
  DIJKSTRA: "Dijkstra",
  BFS: "BFS",
  DFS: "DFS",
  ASTAR: "A*",
};

const DRAW_MODE = {
  WALLS: "Walls",
  WEIGHTS: "Weights",
};

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      startNodeRow: INITIAL_START_ROW,
      startNodeCol: INITIAL_START_COL,
      targetNodeRow: INITIAL_TARGET_ROW,
      targetNodeCol: INITIAL_TARGET_COL,
      launchPadRow: null,
      launchPadCol: null,
      mouseDown: false,
      algorithm: ALGORITHM.DIJKSTRA,
      drawMode: DRAW_MODE.WALLS,
      isMovingStart: false,
      isMovingTarget: false,
      isMovingLaunchPad: false,
      weightValue: 5,
    };
    // Bind 'this' in constructor to avoid binding on every render.
    this.copyGrid = copyGrid.bind(this);
    this.clearWeights = clearWeights.bind(this);
    this.clearPath = clearPath.bind(this);
    this.clearWalls = clearWalls.bind(this);
    this.createInitialGrid = createInitialGrid.bind(this);
    this.resetNodes = resetNodes.bind(this);
  }

  setUp() {
    document.body.onmouseup = this.handleOnMouseUp.bind(this);
    document.body.onmouseleave = this.handleOnMouseUp.bind(this);
  }

  componentDidMount() {
    this.setUp();
    this.createInitialGrid(NUM_ROWS, NUM_COLS);
  }

  render() {
    const { grid } = this.state;
    return (
      <div>
        <NavigationBar>
          <NavigationSection>
            <DropdownMenu title={this.state.algorithm}>
              <button onClick={this.setAlgorithmDijkstra}>Dijkstra</button>
              <button onClick={this.setAlgorithmBFS}>BFS</button>
              <button onClick={this.setAlgorithmDFS}>DFS</button>
              <button onClick={this.setAlgorithmAStar}>A*</button>
            </DropdownMenu>
            <button id="visualize-button" onClick={this.visualizeAlgorithm}>
              Go
            </button>
          </NavigationSection>

          <NavigationSection>
            <button onClick={this.clearPath}>Clear Path</button>
            <button onClick={this.clearWalls}>Clear Walls</button>
            <button onClick={this.clearWeights}>Clear Weights</button>
          </NavigationSection>

          <NavigationSection>
            <DrawToggle setDrawMode={this.setDrawMode} />
          </NavigationSection>

          <NavigationSection>
            <Slider
              value={this.state.weightValue}
              setValue={this.setWeightValue}
            />
          </NavigationSection>

          <NavigationSection>
            <DropdownMenu title="More">
              <button>Attributes</button>
              <button>GitHub</button>
            </DropdownMenu>
          </NavigationSection>
        </NavigationBar>
        {this.displayGrid(grid)}
        <AlgorithmTitle algorithm={this.state.algorithm} />
        <Credits />
      </div>
    );
  }

  // OnClick handlers.
  setAlgorithmDijkstra = () => {
    this.setState({ algorithm: ALGORITHM.DIJKSTRA });
  };
  setAlgorithmBFS = () => {
    this.setState({ algorithm: ALGORITHM.BFS });
  };
  setAlgorithmDFS = () => {
    this.setState({ algorithm: ALGORITHM.DFS });
  };
  setAlgorithmAStar = () => {
    this.setState({ algorithm: ALGORITHM.ASTAR });
  };
  visualizeAlgorithm = () => {
    this.visualize(this.state.algorithm);
  };
  setDrawMode = (mode) => {
    this.setState({ drawMode: mode });
  };
  setWeightValue = (value) => {
    this.setState({ weightValue: value });
  };

  // Visualizes the algorithm with discovery animations.
  visualize(algorithm) {
    switch (algorithm) {
      case ALGORITHM.DIJKSTRA:
        this.visualizeDijkstra();
        break;
      case ALGORITHM.BFS:
        this.visualizeBreadthFirstSearch();
        break;
      case ALGORITHM.DFS:
        this.visualizeDepthFirstSearch();
        break;
      case ALGORITHM.ASTAR:
        this.visualizeAStar();
        break;
      default:
        return;
    }
  }

  // Displays the algorithm's path without discovery animations.
  redrawPath(algorithm) {
    let grid = this.copyGrid();
    const startNode = grid[this.state.launchPadRow][this.state.launchPadCol];
    const targetNode = grid[this.state.targetNodeRow][this.state.targetNodeCol];

    // Get the path of the given algorithm.
    var pathReversed;
    switch (algorithm) {
      case ALGORITHM.DIJKSTRA:
        pathReversed = dijkstra(
          grid,
          startNode,
          targetNode,
          NUM_ROWS,
          NUM_COLS,
          this.state.weightValue
        ).shortestPathReversed;
        break;
      case ALGORITHM.BFS:
        pathReversed = breadthFirstSearch(
          grid,
          startNode,
          targetNode,
          NUM_ROWS,
          NUM_COLS
        ).shortestPathReversed;
        break;
      case ALGORITHM.DFS:
        pathReversed = depthFirstSearch(
          grid,
          startNode,
          targetNode,
          NUM_ROWS,
          NUM_COLS
        ).pathReversed;
        break;
      case ALGORITHM.ASTAR:
        pathReversed = aStar(
          grid,
          startNode,
          targetNode,
          NUM_ROWS,
          NUM_COLS,
          this.state.weightValue
        ).shortestPathReversed;
        break;
      default:
        return;
    }

    const lines = this.pathToLines(pathReversed);

    grid = this.copyGrid();

    for (let i = 0; i < pathReversed.length; i++) {
      const row = pathReversed[i].row;
      const col = pathReversed[i].col;
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
      this.setState({ isMovingTarget: true, mouseDown: true });
      return;
    }
    // Start moving launch pad.
    if (node.isPath && node.direction === "landing-pad") {
      this.setState({ isMovingLaunchPad: true, mouseDown: true });
      return;
    }
    // Start moving start node.
    if (node.isStart) {
      this.setState({ isMovingStart: true, mouseDown: true });
      return;
    }
    // Start drawing walls or weights no the node.
    switch (this.state.drawMode) {
      case DRAW_MODE.WALLS:
        node.isWall = !node.isWall;
        node.isWeight = false;
        this.setState({ grid: grid, mouseDown: true });
        break;
      case DRAW_MODE.WEIGHTS:
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
        isMovingStart: false,
        isMovingTarget: false,
        isMovingLaunchPad: false,
      });
    }
  }

  handleOnMouseEnter(row, col) {
    if (this.state.mouseDown === true) {
      const grid = this.copyGrid();
      const node = grid[row][col];
      // Move target node.
      if (this.state.isMovingTarget) {
        // Remove path.
        for (const row of grid) {
          for (var node_ of row) {
            node_.isPath = false;
            node_.direction = null;
            node_.isVisited = false;
          }
        }
        // Move target node.
        const prevTarget =
          grid[this.state.targetNodeRow][this.state.targetNodeCol];
        if (!prevTarget.isTargetReached) {
          // Target was never reached, no need to redraw.
          prevTarget.isTarget = false;
          node.isTarget = true;
          this.setState({ grid: grid, targetNodeRow: row, targetNodeCol: col });
          return;
        }
        prevTarget.isTarget = false;
        prevTarget.isTargetReached = false;
        prevTarget.isStart = false;
        node.isTarget = true;
        node.isTargetReached = true;
        // Set state.
        this.setState(
          {
            grid: grid,
            targetNodeRow: row,
            targetNodeCol: col,
          },
          // ReDraw path.
          () => {
            this.redrawPath(this.state.algorithm);
          }
        );
        return;
        /*this.setState({ grid: grid, targetNodeRow: row, targetNodeCol: col });
        return;*/
      }
      // Move launch pad.
      if (this.state.isMovingLaunchPad) {
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
          () => {
            this.redrawPath(this.state.algorithm);
          }
        );
        return;
      }
      // Move start node.
      if (this.state.isMovingStart) {
        const prevStart =
          grid[this.state.startNodeRow][this.state.startNodeCol];
        prevStart.isStart = false;
        node.isStart = true;
        this.setState({ grid: grid, startNodeRow: row, startNodeCol: col });
        return;
      }

      switch (this.state.drawMode) {
        case DRAW_MODE.WALLS:
          node.isWall = !node.isWall;
          node.isWeight = false;
          this.setState({ grid: grid });
          break;
        case DRAW_MODE.WEIGHTS:
          node.isWeight = !node.isWeight;
          node.isWall = false;
          this.setState({ grid: grid });
          break;
        default:
          return;
      }
    }
  }

  // Map the grid to Node components that are displayed.
  displayGrid(grid) {
    return (
      <div className="grid">
        {grid.map((row, rowIndex) => {
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
}
