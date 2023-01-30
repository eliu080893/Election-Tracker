import React, { Component } from 'react';

// class Reset extends Component {
//     constructor(props) {
//         super(props)

//     }

//     render() {
//         return (
//             <button onClick={ () => {this.props.handleClick()} }>
//                 Reset the Map
//             </button>
//         )
//     }
// }

type Props = {
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

// CONVERSION TO FUNCTIONAL COMPONENTS with typescript
const Reset = (props: Props): JSX.Element=> {
    return(
        <button onClick={props.handleClick}>
            Reset
        </button>
    )
}

export default Reset;