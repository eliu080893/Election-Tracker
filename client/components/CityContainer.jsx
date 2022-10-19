import React, { Component, useState, useEffect } from 'react';
import Button from './Button.jsx';
import City from './City.jsx'
import Reset from './Reset.jsx';

// function CityContainer() {

//     const [state, setState] = useState();
    
//     useEffect( () => {
//         fetch('/api')
//             .then( res => res.json())
//             .then( res => {
//                 console.log(res)
//                 setState(res)
//             })
//     }, [])

//     return ( 
//         <div id='cityContainer'>
//             <City />
//         </div>
//     )
// }

class CityContainer extends Component {
    constructor(props){
        super(props)

        this.handleMapReset = this.handleMapReset.bind(this)
        this.handleClickCustom = this.handleClickCustom.bind(this)
        this.handleClickChangeWinner = this.handleClickChangeWinner.bind(this)

        this.state = {}
    }


    resetTheBoard(){
        fetch('/api')
        .then( res => res.json())
        .then( res => {
            this.setState(res)
            this.setState( {...this.state, custom: true } )
            console.log(this.state)
        })
        .catch(err => {
            this.setState( {hasError: true})
        })
    }

    handleMapReset() {
        this.resetTheBoard()
    }


    handleClickCustom(){
        if (this.state.custom === false) {
            this.setState( {...this.state, custom: true} )
        } else {
            this.setState( {...this.state, custom: false} )
        }
    }

    handleClickChangeWinner(event){
        console.log('Current custom mode? ', String(this.state.custom))
        const currentState = (event.target.getAttribute('statename'));

        if (this.state.custom === true) {
            
            // console.log('L1: previous winner: ', this.state[currentState].winner);

            this.setState((state) => {

                // For each candidate for the state, we want to cycle between the winners, and also update to the new winning political party
                let candidateArray = Object.keys(state[currentState].candidates)
                let currentIndex = candidateArray.indexOf(state[currentState].winner)
                let newWinnerIndex;
                let newWinner;
                let newWinnerParty;
                if (currentIndex === candidateArray.length - 1) {
                    newWinnerIndex = 0
                    newWinner = candidateArray[newWinnerIndex]
                } else {
                    newWinnerIndex = currentIndex + 1;
                    newWinner = candidateArray[newWinnerIndex]
                }
                newWinnerParty = state[currentState].candidates[newWinner].party_id
                // console.log("New custom winner info: ", newWinner, " ", newWinnerIndex, " ", newWinnerParty)

                let updatedState = {...state,
                    [currentState]: {
                        ...state[currentState],
                        winner: newWinner,
                        winner_party: newWinnerParty
                    }
                }
                
                return updatedState;
            })
        }
    }

    componentDidMount(){
        this.resetTheBoard()
    }

    render() {

        let stateArray = [];

        for(const key in this.state) {
            if (key !== 'custom') {
                stateArray.push(
                <City
                key={key}
                stateId={key}
                custom={this.state.custom}
                electoral_votes={this.state[key].electoral_votes}
                winner={this.state[key].winner}
                winner_party={this.state[key].winner_party}
                handleClickChangeWinner={this.handleClickChangeWinner}
                /> 
                )
            }
        }

        let customMode = String(this.state.custom)

        return ( 
            <div>
                <div id='customButton'>
            <Button handleClick={this.handleClickCustom}/>
                </div>

                <div id='customButton'>
            <Reset handleClick={this.handleMapReset}/>
                </div>

                <h1>Custom Mode: {customMode} </h1>

                <div id='cityContainer'>
                    {this.state.hasError ? <div>Error occured while fetching the data</div> : stateArray}
                </div>
            </div>
        )
    }
}

export default CityContainer;