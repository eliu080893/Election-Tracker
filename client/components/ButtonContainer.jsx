import React, { Component, useState, useEffect } from 'react';
import Button from './buttons/Button.jsx';
import Reset from './buttons/Reset.jsx';
import SaveButton from './buttons/SaveButton.jsx';
import DeleteButton from './buttons/DeleteButton.jsx';
import ImportButton from './buttons/ImportButton.jsx';

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

                <input type='text' onChange={this.onChange} placeholder="Name your custom map!"/>

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