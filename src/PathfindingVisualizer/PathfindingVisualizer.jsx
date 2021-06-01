import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra} from './Search Algorithms/Dijkstra';
import {breadthFirstSearch} from './Search Algorithms/BreadthFirstSearch';
import {depthFirstSearch} from './Search Algorithms/DepthFirstSearch';

import './PathfindingVisualizer.css';

const NUM_ROWS = 20;
const NUM_COLS = 40;

const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const TARGET_NODE_ROW = 18;
const TARGET_NODE_COL = 38;

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseDown: false,
        };
    }

    componentDidMount() {
        const grid = this.createInitialGrid();
        document.body.onmouseup = this.handleOnMouseUp.bind(this);
        document.body.onmouseleave = this.handleOnMouseUp.bind(this);
        this.setState({grid: grid});
    }

    render() {
        const {grid} = this.state;
        return (
            <div>
                <div className="search-algorithms">
                    <button onClick={() => this.visualizeDijkstra()}>Dijkstra's Algorithm</button>
                    <button onClick={() => this.visualizeBreadthFirstSearch()}>Breadth First Search</button>
                    <button onClick={() => this.visualizeDepthFirstSearch()}>Depth First Search</button>
                </div>
                <div className="grid-functions">
                    <button onClick={this.clearWalls.bind(this)}>Clear Walls</button>
                </div>
                {this.displayGrid(grid)}
            </div>
        );
    }

    // Visualize Dijkstra search algorithm.
    visualizeDijkstra() {
        // Reset nodes to unvisited, non-path state.
        let grid = this.copyGrid();
        this.resetNodes(grid);
        this.setState({grid: grid});
        // Make another copy of grid to use with dijkstra algorithm.
        grid = this.copyGrid();
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
        const {visitedNodesInOrder, shortestPathReversed} = dijkstra(grid, startNode, targetNode, NUM_ROWS, NUM_COLS);
        this.animateSearch(visitedNodesInOrder, shortestPathReversed);
    }

    // Visualize Breadth First Search algorithm.
    visualizeBreadthFirstSearch() {
        // Reset nodes to unvisited, non-path state.
        let grid = this.copyGrid();
        this.resetNodes(grid);
        this.setState({grid: grid});
        // Make another copy of grid to use with dijkstra algorithm.
        grid = this.copyGrid();
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
        const {visitedNodesInOrder, shortestPathReversed} = breadthFirstSearch(grid, startNode, targetNode, NUM_ROWS, NUM_COLS);
        this.animateSearch(visitedNodesInOrder, shortestPathReversed);
    }

    // Visualize Depth First Search algorithm.
    visualizeDepthFirstSearch() {
        // Reset nodes to unvisited, non-path state.
        let grid = this.copyGrid();
        this.resetNodes(grid);
        this.setState({grid: grid});
        // Make another copy of grid to use with dijkstra algorithm.
        grid = this.copyGrid();
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const targetNode = grid[TARGET_NODE_ROW][TARGET_NODE_COL];
        const {visitedNodesInOrder, pathReversed} = depthFirstSearch(grid, startNode, targetNode, NUM_ROWS, NUM_COLS);
        this.animateSearch(visitedNodesInOrder, pathReversed);
    }

    // Animate the discovery of nodes.
    animateSearch(visitedNodesInOrder, pathReversed) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                // Normally shouldn't do this, but had to to optimize performance.
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                // Start path animation after last visited node.
                if (i === visitedNodesInOrder.length - 1) {
                    this.animatePath(pathReversed);
                }
            }, 5 * i);
        }
    }

    // Animate the traversal of path.
    animatePath(pathReversed) {
        for (let i = pathReversed.length - 1; i >= 0; i--) {
            setTimeout(() => {
                const node = pathReversed[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
            }, 1000 * ((pathReversed.length - i) / pathReversed.length));
        }
    }

    // Handles onMouseDown event on node at given row and column.
    handleOnMouseDown(row, col) {
        const grid = this.copyGrid();
        const node = grid[row][col];
        node.isWall = !node.isWall;
        this.setState({grid: grid, mouseDown: true});
    }

    handleOnMouseUp() {
        if (this.state.mouseDown === true) {
            this.setState({mouseDown: false});
        }
    }

    handleOnMouseEnter(row, col) {
        if (this.state.mouseDown === true) {
            const grid = this.copyGrid();
            const node = grid[row][col];
            node.isWall = !node.isWall;
            this.setState({grid: grid})
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
        return  (
            <div className="grid">
                {nodes.map((row, rowIndex) => {
                    return <div className="row" key={rowIndex}>
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
                                handleOnMouseDown={this.handleOnMouseDown.bind(this)}
                                handleOnMouseUp={this.handleOnMouseUp.bind(this)}
                                handleOnMouseEnter={this.handleOnMouseEnter.bind(this)}>
                                </Node>);
                        })}
                    </div>
                })}
            </div>
        );
    }

    // Reset's all nodes back to an univisited, non-path state.
    resetNodes(grid) {
        for (const row of grid) {
            for (const node of row) {
                node.isVisited = false;
                node.isPath = false;
                node.previousNode = null;
                node.distance = Infinity;
            }
        }
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
        this.setState({grid: grid});
    }

    copyGrid() {
        const grid = this.state.grid;
        const copiedGrid = [];
        for (const row of grid) {
            const copiedRow = row.map((node) => {
                const copiedNode = Object.assign({}, node);
                return copiedNode;
            })
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
}