import React, { Component, useState, useEffect } from 'react';
import Button from './Button.jsx';
import Reset from './Reset.jsx';
import SaveButton from './SaveButton.jsx';

class ButtonContainer extends Component {
    constructor(props) {
        super(props)
 
    }

    render() {
        return (
            <div>
                <div id='customButton'>
                    <Button handleClick={ () => {this.props.handleClickCustom()} }/>
                </div>

                <div id='resetButton'>
                    <Reset handleClick={ () => {this.props.handleMapReset()} }/>
                </div>

                <div id='resetButton'>
                    <SaveButton handleClick={ () => {this.props.handlePostRequest()} }/>
                </div>
            </div>
        )
    }
}

export default ButtonContainer;