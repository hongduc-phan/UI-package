import React from 'react'
import Modal from 'react-modal'

export default ({ children, onRequestClose, ...props }) => (
    <Modal {...props}>
        <div className={'ReactModal__Content__Wrapper'}>
            {onRequestClose && (
                <button className={'btn-close-modal'} onClick={onRequestClose}>
                    <i className='material-icons'>close</i>
                </button>
            )}
            {children}
        </div>
    </Modal>
)
