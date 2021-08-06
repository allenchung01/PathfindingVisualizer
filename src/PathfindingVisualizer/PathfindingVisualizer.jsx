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
import PopUp from "./Components/PopUp/PopUp";

// Functions
import { dijkstra } from "./Search Algorithms/Dijkstra";
import { breadthFirstSearch } from "./Search Algorithms/BreadthFirstSearch";
import { depthFirstSearch } from "./Search Algorithms/DepthFirstSearch";
import { aStar } from "./Search Algorithms/AStar";
import { getScreenWidth, getScreenHeight } from "./Functions/ScreenFunctions";
import { pathToLines } from "./Functions/HelperFunctions";
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
      areCreditsVisible: false,
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
            {
              <DropdownMenu title="More">
                <button onClick={this.toggleCredits}>Credits</button>
                <a href="https://github.com/allenchung01">
                  <button>GitHub</button>
                </a>
              </DropdownMenu>
            }
          </NavigationSection>
        </NavigationBar>
        {this.displayGrid(grid)}
        <AlgorithmTitle algorithm={this.state.algorithm} />
        {this.state.areCreditsVisible ? (
          <PopUp togglePopUp={this.toggleCredits}>
            <Credits />
          </PopUp>
        ) : null}
        {/*<Credits />*/}
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

  toggleCredits = () => {
    this.setState({ areCreditsVisible: !this.state.areCreditsVisible });
  };

  // Visualizes the algorithm with discovery animations.
  visualize(algorithm) {
    // Reset the grid before visualizing.
    let grid = this.copyGrid();
    this.resetNodes(grid);
    this.setState({ grid: grid }, () => {
      // Make another copy of grid to perform algorithm on.
      grid = this.copyGrid();
      const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
      const targetNode =
        grid[this.state.targetNodeRow][this.state.targetNodeCol];

      switch (algorithm) {
        case ALGORITHM.DIJKSTRA:
          this.visualizeDijkstra(grid, startNode, targetNode);
          break;
        case ALGORITHM.BFS:
          this.visualizeBreadthFirstSearch(grid, startNode, targetNode);
          break;
        case ALGORITHM.DFS:
          this.visualizeDepthFirstSearch(grid, startNode, targetNode);
          break;
        case ALGORITHM.ASTAR:
          this.visualizeAStar(grid, startNode, targetNode);
          break;
        default:
          return;
      }
    });
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

    const lines = pathToLines(pathReversed);

    // Set the grid to the new grid with updated path.
    grid = this.copyGrid();
    for (let i = 0; i < pathReversed.length; i++) {
      const row = pathReversed[i].row;
      const col = pathReversed[i].col;
      grid[row][col].direction = lines[i];
      grid[row][col].isPath = true;
    }
    this.setState({ grid: grid });
  }

  /*----- Algorithm Methods -----*/

  visualizeDijkstra(grid, startNode, targetNode) {
    const { visitedNodesInOrder, shortestPathReversed } = dijkstra(
      grid,
      startNode,
      targetNode,
      NUM_ROWS,
      NUM_COLS,
      this.state.weightValue
    );
    this.animateSearch(visitedNodesInOrder, shortestPathReversed);
  }

  visualizeBreadthFirstSearch(grid, startNode, targetNode) {
    const { visitedNodesInOrder, shortestPathReversed } = breadthFirstSearch(
      grid,
      startNode,
      targetNode,
      NUM_ROWS,
      NUM_COLS
    );
    this.animateSearch(visitedNodesInOrder, shortestPathReversed);
  }

  visualizeDepthFirstSearch(grid, startNode, targetNode) {
    const { visitedNodesInOrder, pathReversed } = depthFirstSearch(
      grid,
      startNode,
      targetNode,
      NUM_ROWS,
      NUM_COLS
    );
    this.animateSearch(visitedNodesInOrder, pathReversed);
  }

  visualizeAStar(grid, startNode, targetNode) {
    const { visitedNodesInOrder, shortestPathReversed } = aStar(
      grid,
      startNode,
      targetNode,
      NUM_ROWS,
      NUM_COLS,
      this.state.weightValue
    );
    this.animateSearch(visitedNodesInOrder, shortestPathReversed);
  }

  /*----- Animation Methods -----*/

  // Animates the discovery of nodes in the given list.
  animateSearch(visitedNodesInOrder, pathReversed) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (i === visitedNodesInOrder.length - 1) {
          // Animate the path after discovery animation is complete.
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

  // Animates the final path from start to target node.
  animatePath(pathReversed) {
    const lines = pathToLines(pathReversed);
    for (let i = pathReversed.length - 1; i >= 0; i--) {
      setTimeout(
        () => this.moveRocketShip(pathReversed, lines, i),
        3000 * ((pathReversed.length - i) / pathReversed.length)
      );
    }
  }

  // Moves the rocket ship one space given the path, lines, and position.
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

  /*----- Mouse Handlers -----*/

  // Handles onMouseDown event on node at given coordinates.
  handleOnMouseDown(row, col) {
    const grid = this.copyGrid();
    const node = grid[row][col];

    // Start moving start, target or launchpad nodes.
    if (node.isTarget) {
      this.setState({ isMovingTarget: true, mouseDown: true });
      return;
    }
    if (node.isPath && node.direction === "landing-pad") {
      this.setState({ isMovingLaunchPad: true, mouseDown: true });
      return;
    }
    if (node.isStart) {
      this.setState({ isMovingStart: true, mouseDown: true });
      return;
    }

    // Start drawing walls or weights.
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

  // Handle onMouseEnter for node at given coordinates.
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
        // Reposition target node.
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
        this.setState(
          {
            grid: grid,
            targetNodeRow: row,
            targetNodeCol: col,
          },
          () => {
            // Redraw the rest of the path.
            this.redrawPath(this.state.algorithm);
          }
        );
        return;
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
        // Reposition the launch pad.
        const prevLaunchPad =
          grid[this.state.launchPadRow][this.state.launchPadCol];
        prevLaunchPad.isPath = false;
        prevLaunchPad.direction = null;
        node.isPath = true;
        node.direction = "landing-pad";
        // Reposition the start node.
        const prevStart =
          grid[this.state.startNodeRow][this.state.startNodeCol];
        prevStart.isStart = false;
        node.isStart = true;
        this.setState(
          {
            grid: grid,
            launchPadRow: row,
            launchPadCol: col,
            startNodeRow: row,
            startNodeCol: col,
          },
          // Redraw the rest of the path.
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

      // Continue drawing walls or weights.
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
