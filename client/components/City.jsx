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
        return (
            <div className='city' statename={this.props.stateId} onClick={ (e)=> this.props.handleClickChangeWinner(e) }>
                {this.props.stateId}
                {/* <p className='city_p'>{this.props.stateId}</p> */}
                <p onClick={this.handleClick}>{this.props.electoral_votes} - {this.props.winner}</p>
            </div>
        )
    }
}

export default City;