import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra} from './Search Algorithms/Dijkstra';
import {breadthFirstSearch} from './Search Algorithms/BreadthFirstSearch';
import {depthFirstSearch} from './Search Algorithms/DepthFirstSearch';

import './PathfindingVisualizer.css';

const NUM_ROWS = 30;
const NUM_COLS = 30;

const START_NODE_ROW = 15;
const START_NODE_COL = 1;
const TARGET_NODE_ROW = 22;
const TARGET_NODE_COL = 28;

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        const grid = createGrid();
        this.setState({grid});
    }

    render() {
        const {grid} = this.state;
        return (
            <div>
                <button onClick={() => this.visualizeDijkstra()}>Dijkstra</button>
                <button onClick={() => this.visualizeBreadthFirstSearch()}>Breadth First Search</button>
                <button onClick={() => this.visualizeDepthFirstSearch()}>Depth First Search</button>
                {displayGrid(grid)}
            </div>
        );
    }

    // Visualize Dijkstra search algorithm.
    visualizeDijkstra() {
        resetNodes(this.state.grid);
        this.setState({grid: this.state.grid});
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
        const {visitedNodesInOrder, shortestPathReversed} = dijkstra(grid, startNode, targetNode, NUM_ROWS, NUM_COLS);
        this.animateSearch(visitedNodesInOrder, shortestPathReversed);
    }

    // Visualize Breadth First Search algorithm.
    visualizeBreadthFirstSearch() {
        resetNodes(this.state.grid);
        this.setState({grid: this.state.grid});
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
        const {visitedNodesInOrder, shortestPathReversed} = breadthFirstSearch(grid, startNode, targetNode, NUM_ROWS, NUM_COLS);
        this.animateSearch(visitedNodesInOrder, shortestPathReversed);
    }

    // Visualize Depth First Search algorithm.
    visualizeDepthFirstSearch() {
        resetNodes(this.state.grid);
        this.setState({grid: this.state.grid});
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
        const {visitedNodesInOrder, pathReversed} = depthFirstSearch(grid, startNode, targetNode, NUM_ROWS, NUM_COLS);
        this.animateSearch(visitedNodesInOrder, pathReversed);
    }

    animateSearch(visitedNodesInOrder, pathReversed) {
        // Animate the discovery of nodes.
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
              const node = visitedNodesInOrder[i];
              node.ref.current.markAsVisited(node.distance);
              // Start path animation after last visited node.
              if (i === visitedNodesInOrder.length - 1) {
                    this.animatePath(pathReversed);
              }
            }, 5 * i);
        }
    }

    animatePath(pathReversed) {
        // Animate the path.
        for (let i = pathReversed.length - 1; i >= 0; i--) {
            setTimeout(() => {
                const node = pathReversed[i];
                node.ref.current.markAsPath(); 
            }, 1000 * ((pathReversed.length - i) / pathReversed.length));
        }
    }
}

// Node object constructor.
export function NodeObj(col, row) {
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
    // Each node has a reference to it's UI component.
    this.ref = React.createRef();
}

// Create a 2D array of node objects.
function createGrid() {
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
function displayGrid(nodes) {
    return  (
        <div className="grid">
            {nodes.map((row, rowIndex) => {
                return <div className="row" key={rowIndex}>
                    {row.map((node, nodeIndex) => {
                        return (
                            <Node 
                            ref={node.ref}
                            key={nodeIndex}
                            isStart={node.isStart} 
                            isTarget={node.isTarget}
                            isVisited={node.isVisited}
                            row={node.row}
                            col={node.col}
                            node={node}
                            toggleWall={toggleWall}>
                            </Node>);
                    })}
                </div>
            })}
        </div>
    );
}

function toggleWall(node) {
    node.isWall = !node.isWall;
}

// Reset's all nodes back to an univisited state.
function resetNodes(grid) {
    for (const row of grid) {
        for (const node of row) {
            node.ref.current.markUnvisited();
            node.isVisited = false;
            node.previousNode = null;
            node.distance = Infinity;
        }
    }
}