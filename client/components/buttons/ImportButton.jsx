import React, { Component } from 'react';


class ImportButton extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <button onClick={this.props.handleClick }>
                Load Custom Map
            </button>
        )
    }
}

export default ImportButton;