import React, { Component } from 'react';
import CityContainer from './CityContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <p>Hello World! Let's start with this App.</p>
                <CityContainer />
            </div>
        )
    }
}

export default App;