import React, { PureComponent } from 'react'
import Modal from './Modal'
import { confirmDialogModalStyles } from '../styles'
import { requestTranslation } from '@sangre-fp/i18n'

export default class ConfirmDialog extends PureComponent {
  render() {
    const { visible, toggleConfirmationDialog, callback, title, text } = this.props

    return (
      <Modal
          isOpen={visible}
          contentLabel='confirmation-dialog'
          ariaHideApp={false}
          style={confirmDialogModalStyles}
          onRequestClose={toggleConfirmationDialog}
      >
        <div className='confirmation-modal-content p-4'>
          <div className='p-2'>
            <h3 className='confirmation-modal-title text-left'>{title}</h3>
            {text && text.length && <p className='confirmation-modal-text'>{text}</p>}
            <div className='confirmation-modal-actions d-flex justify-content-end'>
                <button onClick={toggleConfirmationDialog} className='btn btn-plain-gray'>
                    {requestTranslation('cancel').toUpperCase()}
                </button>
                <button className='btn btn-primary' onClick={() => {
                  callback()
                  toggleConfirmationDialog()
                }}>
                    {requestTranslation('confirm')}
                </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
