import React, { Component } from 'react';


class Score extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div id='score_comp'>
                <p>
                    <span id='spanleft'>{this.props.candidate} :</span> <span id='spanscore'> {this.props.electoral_votes}</span>
                </p>
            </div>
        )
    }
}

export default Score;