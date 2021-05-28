import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {isTarget, isStart} = this.props;
        const nodeType = isTarget ? 'node-finish' : isStart ? 'node-start' : '';
        return <div className = {`node ${nodeType}`}></div>
    }
}