# My Pathfinding Visualizer

This is a project I built using React JS that visualizes different pathfinding algorithms. Try it out  [here](https://allenchung01.github.io/PathfindingVisualizer/).

## Tutorial

**Build walls** by dragging across the nodes on the screen.

**Visualize algorithms** by selecting one of the algorithms at the top of the screen.

**Clear walls and paths** by selecting the buttons located under the algorithms.

## Visualization

**Unvisited nodes** are dark gray. All nodes start out as unvisited.

**Visited nodes** are light gray.

Nodes currently being searched are shown by the light blue and pink gradient.

The **Start node** is the rocket ship.

The **End node** is the flag.

After the search has been completed, **Path nodes** are drawn from the start node to the end node as white lines.

## Rules

The rocket ship can only move into adjacent nodes (not diagonally). 

Each move to an adjacent node is equal to a distance of 1.
