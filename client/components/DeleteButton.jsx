import React, { Component } from 'react';


class DeleteButton extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <button onClick={this.props.handleClick }>
                Delete button
            </button>
        )
    }
}

export default DeleteButton;