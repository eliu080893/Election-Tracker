import React, { Component } from 'react';


class SaveButton extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <button onClick={ this.props.handleClick }>
                Save Custom Map
            </button>
        )
    }
}

export default SaveButton;