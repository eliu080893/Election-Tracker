import React, { Component } from 'react';


class Reset extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <button onClick={ () => {this.props.handleClick()} }>
                Reset the Map
            </button>
        )
    }
}

export default Reset;