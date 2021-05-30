import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisited: false,
            isPath: false,
            distance: Infinity,
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

    render() {
        const {isVisited, isPath, distance} = this.state;
        const {isTarget, isStart} = this.props;
        const nodeType = 
            isTarget ? 'node-finish' : 
            isStart ? 'node-start' : 
            isPath ? 'node-path':
            isVisited ? 'node-visited': 
            '';
        return <div className = {`node ${nodeType}`}></div>
    }
}