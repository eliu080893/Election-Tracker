import React, { Component, useState, useEffect } from 'react';
import ButtonContainer from './ButtonContainer.jsx';
import City from './City.jsx'
import Scoreboard from './Scoreboard.jsx';


class CityContainer extends Component {
    constructor(props){
        super(props)

        this.handleClickCustom = this.handleClickCustom.bind(this)
        this.handleMapReset = this.handleMapReset.bind(this)
        this.handleClickChangeWinner = this.handleClickChangeWinner.bind(this)
        this.handlePostRequest = this.handlePostRequest.bind(this)
        this.handleImportRequest = this.handleImportRequest.bind(this)
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this)

        this.state = {}
    }

    /////////////////////// HELPER FUNCTIONS FOR EASE OF USE ///////////////////////
    resetTheBoard(){
        fetch('/api')
        .then( res => res.json())
        .then( res => {
            this.setState(res)
            this.setState( {...this.state, custom: false } )
        })
        // .catch(err => {
        //     this.setState( {hasError: true})
        // })
    }

    //////////////////////////////////  EVENT HANDLERS //////////////////////////////////////

    handleClickCustom(){
        if (this.state.custom === false) {
            this.setState( {...this.state, custom: true} )
        } else {
            this.setState( {...this.state, custom: false} )
        }
    }

    handleMapReset() {
        this.resetTheBoard()
    }

    handleClickChangeWinner(event){
        // console.log('Current custom mode? ', String(this.state.custom))
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

    // Save your custom map to the database
    handlePostRequest(name){
        const postObj = {
            name: name,
            state: this.state
        }
        fetch('/api',
        {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postObj)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    // Update to your custom map from the databse
    handleImportRequest (name){

        fetch(`/custom?name=${name}`)
            .then( res => res.json())
            .then( (res) => { 
                console.log('got the custom map')
                let newState = res.state;
                newState.custom = true;

                this.setState( (state) => {
                    return newState
                })

            })
            .catch( err => {
                // console.log('get custom map broke down on CC-L112')
                console.log(err)
            })

    }

    // Delete your custom map from the database
    handleDeleteRequest(name){
        const postObj = {
            name: name,
        }

        fetch('/api',
        {
            method:'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postObj)
        })
        .catch(err => {
            console.log(err)
        })
    }



    //////////////////////////////////  LIFECYCLE METHODS //////////////////////////////////////
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

        // let customMode = String(this.state.custom)

        return ( 
            <div id='city_container'>
                <div id='info_bar'>
                    <ButtonContainer 
                        handleClickCustom={this.handleClickCustom} 
                        handleMapReset={this.handleMapReset}
                        handlePostRequest={this.handlePostRequest}
                        handleImportRequest={this.handleImportRequest}
                        handleDeleteRequest={this.handleDeleteRequest}
                        custom={this.state.custom}
                    />
                    <Scoreboard vote={this.state} />
                </div>

                <div id='city_display'>
                    {this.state.hasError ? <div>Error occured while fetching the data</div> : stateArray}
                </div>
            </div>
        )
    }
}

export default CityContainer;