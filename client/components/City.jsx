import React, { Component } from 'react';

class City extends Component{
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let word = String(this.props.custom)
        alert(`${this.props.stateId} has been clicked! ${word}`)
        if (this.props.custom === true) {
            console.log('clicked while custom mode')
        }
    }

    render() {
        return (
            <div className='city' onClick={this.handleClick}>
                <p className='city_p'>{this.props.stateId}</p>
                <p>{this.props.electoral_votes}</p>
            </div>
        )
    }
}

export default City;