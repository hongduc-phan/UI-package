import React, { PureComponent } from 'react'

export default class PopupContainer extends PureComponent {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }

    handleRef = ref => {
        this.ref = ref
    }

    handleClick = evt => {
        const { onClose } = this.props
        if (this.ref && !this.ref.contains(evt.target)) {
            onClose()
        }
    }

    render() {
        const { children } = this.props
        return (
            <div ref={this.handleRef}>
                {children}
            </div>
        )
    }
}
