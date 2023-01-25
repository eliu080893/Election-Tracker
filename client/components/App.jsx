import React, { Component } from 'react';
import CityContainer from './CityContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id='app'>
                <h1 id='title'>PICK YOUR PRESIDENT!</h1>
                <CityContainer />
            </div>
        )
    }
}

export default App;