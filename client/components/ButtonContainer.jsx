import React, { Component, useState, useEffect } from 'react';
import Button from './Button.jsx';
import Reset from './Reset.jsx';
import SaveButton from './SaveButton.jsx';
import DeleteButton from './DeleteButton.jsx';

class ButtonContainer extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            value: ''
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState( (state) => {
            return {value: e.target.value}
        })
    }

    render() {
        return (
            <div id='buttonContainer'>
                <div id='customButton'>
                    <Button handleClick={ () => {this.props.handleClickCustom()} }/>
                </div>

                <div id='resetButton'>
                    <Reset handleClick={ () => {this.props.handleMapReset()} }/>
                </div>

                <input type='text' onChange={this.onChange}/>

                <div id='saveButton'>
                    <SaveButton handleClick={ () => {this.props.handlePostRequest(this.state.value)} }/>
                </div>

                <div id='deleteButton'>
                    <DeleteButton handleClick={ () => {this.props.handleDeleteRequest(this.state.value)} }/>
                </div>




            </div>
        )
    }
}

export default ButtonContainer;