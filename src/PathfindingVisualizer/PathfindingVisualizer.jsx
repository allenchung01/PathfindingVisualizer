import React, {Component} from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css';

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    }

    componentDidMount() {
        // Create 2D array of nodes.
        const nodes = [];
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 15; col++) {
                const currNode = {
                    row, 
                    col,
                    isStart: row === 7 && col === 1,
                    isTarget: row === 7 && col === 13,
                }
                currentRow.push(currNode);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes});
    }

    render() {
        const {nodes} = this.state;
        return  (
            // Map nodes to a grid.
            <div className="grid">
                {nodes.map((row) => {
                    return <div className="row">
                        {row.map((node) => {
                            const {isStart, isTarget} = node;
                            return (<Node isStart={isStart} isTarget={isTarget}></Node>);
                        })}
                    </div>
                })}
            </div>
        );
    }
}

function createNode(col, row) {
    return ({
        col, 
        row,
    });
}