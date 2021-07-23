import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleWall() {
    this.setState({ isWall: !this.props.isWall });
  }

  handleOnMouseDown() {
    this.props.handleOnMouseDown(this.props.row, this.props.col);
  }

  handleOnMouseUp() {
    this.props.handleOnMouseUp();
  }

  handleOnMouseEnter() {
    this.props.handleOnMouseEnter(this.props.row, this.props.col);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.isWall !== this.props.isWall ||
      nextProps.isVisited !== this.props.isVisited ||
      nextProps.isPath !== this.props.isPath ||
      nextProps.isStart !== this.props.isStart ||
      nextProps.isTargetReached !== this.props.isTargetReached ||
      nextProps.isWeight !== this.props.isWeight ||
      nextProps.isTarget !== this.props.isTarget
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      isTarget,
      isStart,
      isWall,
      isWeight,
      isVisited,
      isPath,
      row,
      col,
      direction,
      isTargetReached,
    } = this.props;
    const nodeType = isTargetReached
      ? "node-target-reached"
      : isTarget
      ? "node-target"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isWeight
      ? "node-weight"
      : isPath && direction == "horizontal"
      ? "node-path-horizontal"
      : isPath && direction == "vertical"
      ? "node-path-vertical"
      : isPath && direction == "ul"
      ? "node-path-ul"
      : isPath && direction == "ur"
      ? "node-path-ur"
      : isPath && direction == "bl"
      ? "node-path-bl"
      : isPath && direction == "br"
      ? "node-path-br"
      : isPath && direction == "landing-pad"
      ? "node-path-landing-pad"
      : "";
    return (
      <div
        onDragStart={(e) => {
          e.preventDefault();
        }}
        className="node-bounds"
        onMouseDown={this.handleOnMouseDown.bind(this)}
        onMouseUp={this.handleOnMouseUp.bind(this)}
        onMouseEnter={this.handleOnMouseEnter.bind(this)}
      >
        <div
          className={`node ${nodeType} ${isVisited ? "visited" : "unvisited"}`}
          id={`node-${row}-${col}`}
        ></div>
      </div>
    );
  }
}
