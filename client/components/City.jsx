import React, { Component } from 'react';

class City extends Component{
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.stopPropagation();
    }

    render() {

        let partyColor = {
            republican: ['red', 'white'],
            democrat: ['blue', 'white'],
            green: ['green', 'white'],
            libertarian: ['gold', 'black'],
            independent: ['purple', 'white'],
            'write-ins': ['white', 'black'],
            unity: ['teal', 'white'],
            constitution: ['gray', 'white'] 
        }

        let style = {
            backgroundColor: null,
            color: null,
        }

        if (this.props.winner_party in partyColor) {
            style.backgroundColor = partyColor[this.props.winner_party][0]
            style.color = partyColor[this.props.winner_party][1]

        } else {
            style.backgroundColor = 'white'
            style.color = 'black'
        }

        return (
            <div 
            className='city' 
            statename={this.props.stateId} 
            onClick={ (e)=> this.props.handleClickChangeWinner(e) } 
            style = {style}
            >
                {this.props.stateId}
                <p onClick={this.handleClick}>
                    <strong>{this.props.electoral_votes}</strong> - {this.props.winner}
                    </p>
            </div>
        )
    }
}

export default City;