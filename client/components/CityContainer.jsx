import React, { Component, useState, useEffect } from 'react';
import Button from './Button.jsx';
import City from './City.jsx'

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

        this.handleClickCustom = this.handleClickCustom.bind(this)

        this.state = {}
    }

    handleClickCustom(){
        if (this.state.custom === false) {
            this.setState( {...this.state, custom: true} )
            alert('changed to true')
        } else {
            this.setState( {...this.state, custom: false} )
            alert('chnaged to false')
        }
    }

    handleClickChangeWinner(){
        if (this.state.custom === true) {
            console.log('clicked while custom mode')
        }
    }

    componentDidMount(){
        fetch('/api')
            .then( res => res.json())
            .then( res => {
                this.setState(res)
                this.setState( {...this.state, custom: false } )
                console.log(this.state)
            })
            .catch(err => {
                this.setState( {hasError: true})
            })
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
                winner={this.state.winner}
                winner_party={this.state.winner_party}
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

                <h1>Custom Mode: {customMode} </h1>

                <div id='cityContainer'>
                    {this.state.hasError ? <div>Error occured while fetching the data</div> : stateArray}
                </div>
            </div>
        )
    }
}

export default CityContainer;