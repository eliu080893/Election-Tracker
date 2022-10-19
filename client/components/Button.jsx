import React, { Component } from 'react';


class Button extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <button onClick={ () => {this.props.handleClick()} }>
                Custom Mode
            </button>
        )
    }
}

export default Button;