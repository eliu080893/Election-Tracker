import React, { Component } from 'react';
import Score from './Score.jsx';

class Scoreboard extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        // alert('hi')
        console.log('Scoreboard mounted')
    }

    render() {

        let data = this.props.vote;

        let totalScores = {};
        for (let city in data) {
            if (totalScores[city.winner] === undefined) {
                totalScores[city.winner] = city.electoral_votes
            } else {
                totalScores[city.winner] += city.electoral_votes
            }
        }

        let candidateArray = [];
        for (let key in totalScores) {
            candidateArray.push(<Score candidate={key} electoral_votes={totalScores[key]} key={key} />)
        }

        return (
            <div>
                hi
            </div>
        )
    }
}

export default Scoreboard;