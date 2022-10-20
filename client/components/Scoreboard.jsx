import React, { Component } from 'react';
import Score from './Score.jsx';

class Scoreboard extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        let data = this.props.vote;

        let totalScores = {};
        for (let city in data) {
            if( city !== 'custom') {
                if (totalScores[data[city].winner] === undefined) {
                    totalScores[data[city].winner] = data[city].electoral_votes
                } else {
                    totalScores[data[city].winner] += data[city].electoral_votes
                }
            }

        }

        let candidateArray = [];
        for (let key in totalScores) {
            candidateArray.push(<Score candidate={key} electoral_votes={totalScores[key]} key={key} />)
            candidateArray.sort( (a,b) => (b.props.electoral_votes - a.props.electoral_votes));
        }

        return (
            <div id='scoreboard_area'>
                {candidateArray}
            </div>
        )
    }
}

export default Scoreboard;