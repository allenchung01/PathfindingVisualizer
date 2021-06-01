import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleWall() {
        this.setState({isWall: !this.props.isWall,});
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
        if (nextProps.isWall !== this.props.isWall ||
            nextProps.isVisited !== this.props.isVisited ||
            nextProps.isPath != this.props.isPath) {
            return true;
        }
        return false;
    }

    render() {
        const {isTarget, isStart, isWall, isVisited, isPath, row, col} = this.props;
        const nodeType = 
            isTarget ? 'node-finish' : 
            isStart ? 'node-start' : 
            isWall ? 'node-wall':
            isPath ? 'node-path':
            isVisited ? 'node-visited': 
            '';
        return (
            <div
            className = 'node-bounds' 
            onMouseDown = {this.handleOnMouseDown.bind(this)}
            onMouseUp = {this.handleOnMouseUp.bind(this)}
            onMouseEnter = {this.handleOnMouseEnter.bind(this)}>
                <div 
                className = {`node ${nodeType}`}
                id={`node-${row}-${col}`}>      
                </div>
            </div>)

    }
}