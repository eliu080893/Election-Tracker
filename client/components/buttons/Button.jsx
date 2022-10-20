import React, { Component } from 'react';


class Button extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        
        let style = {
            backgroundColor: null,
            color: null,
            border: null
        }

        if (this.props.custom) {
            style.color = 'white';
            style.backgroundColor = '#426ED5';
            style.border = '1px red solid';
            style['boxShadow'] = '3px 3px #426ED5'
            style.transition = 'backgroundColor 0.2s, border 0.2s, boxShadow 0.2s'
        } else {
            style.color = 'black'
            style.backgroundColor = 'white'
            style.border = '1px black solid'
        }

        return (
            <button
            onClick={this.props.handleClick }
            id='custom_button'
            style={style}
            >
                Custom Mode
            </button>
        )
    }
}

export default Button;