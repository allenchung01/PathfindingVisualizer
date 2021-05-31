import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisited: false,
            isPath: false,
            isWall: false,
            distance: Infinity,
            row: this.props.row,
            col: this.props.col,
            node: this.props.node,
        };
    }

    markAsVisited(distance) {
        this.setState({
            isVisited: true,
            distance: distance,
        });
    }

    markUnvisited() {
        this.setState({
            isVisited: false,
            isPath: false,
            distance: Infinity,
        });
    }

    markAsPath() {
        this.setState({isPath: true});
    }

    toggleWall() {
        this.setState({isWall: !this.state.isWall,});
        this.props.toggleWall(this.props.node);
    }

    render() {
        const {isVisited, isPath, distance, isWall} = this.state;
        const {isTarget, isStart} = this.props;
        const nodeType = 
            isTarget ? 'node-finish' : 
            isStart ? 'node-start' : 
            isWall ? 'node-wall':
            isPath ? 'node-path':
            isVisited ? 'node-visited': 
            '';
        return (
            <div className = {`node ${nodeType}`} 
            onMouseDown={() => this.toggleWall()}
            onMouseUp = {}
            onMouseOver = {}>
            </div>)
    }
}