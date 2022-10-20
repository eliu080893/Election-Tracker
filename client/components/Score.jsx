import React, { Component } from 'react';


class Score extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h3>{this.props.candidate}: {this.props.electoral_votes}</h3>
            </div>
        )
    }
}

export default Score;