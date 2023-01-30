import React, { Component, useState, useEffect } from 'react';
import Button from './buttons/Button.jsx';
import Reset from './buttons/Reset.jsx';
import SaveButton from './buttons/SaveButton.jsx';
import DeleteButton from './buttons/DeleteButton.tsx';
import ImportButton from './buttons/ImportButton.jsx';

class ButtonContainer extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            value: ''
        }

        this.onChange = this.onChange.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    onChange(e) {
        this.setState( (state) => {
            return {value: e.target.value}
        })
    }

    resetState() {
        this.setState( (state) => {
            return {value: ''}
        })
        console.log('resetted the board')
        document.getElementById('input_bar').value = ''
    }

    render() {
        return (
            <div id='buttonContainer'>

                <div id='customButton'>
                    <Button 
                    handleClick={ () => {this.props.handleClickCustom()} }
                    custom={this.props.custom}/>
                </div>

                <input type='text' onChange={this.onChange} placeholder="Name your custom map!" id="input_bar"/>

                <div id='resetButton'>
                    <Reset handleClick={ () => {
                        this.props.handleMapReset();
                        this.resetState();
                    } }/>
                </div>

                <div id='saveButton'>
                    <SaveButton handleClick={ () => {this.props.handlePostRequest(this.state.value)} }/>
                </div>

                <div id='importButton'>
                    <ImportButton handleClick={ () => {this.props.handleImportRequest(this.state.value)} }/>
                </div>

                <div id='deleteButton'>
                    <DeleteButton handleClick={ () => {this.props.handleDeleteRequest(this.state.value)} }/>
                </div>


            </div>
        )
    }
}

export default ButtonContainer;