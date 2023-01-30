import React, { Component } from 'react';

type Props = {
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

class DeleteButton extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <button onClick={this.props.handleClick }>
                Delete Custom Map
            </button>
        )
    }
}

export default DeleteButton;