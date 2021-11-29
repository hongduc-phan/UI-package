import React, { PureComponent } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import Modal from './Modal'
import { errorModalStyles } from '../styles'
import { requestTranslation } from '@sangre-fp/i18n'

export default class ErrorModal extends PureComponent {
    state = {
        shown: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors.length && nextProps.errors.length !== this.props.errors.length) {
            this.setState({ shown: true })
        }
    }

    handleModalClose = () => {
        const { onClose } = this.props
        // clear all errors
        onClose()
        this.setState({ shown: false })
    }

    render() {
        const { shown } = this.state
        const { errors } = this.props
        const error = _.last(errors)

        return (
            <Modal
                isOpen={shown}
                contentLabel='Errors'
                style={errorModalStyles}
                ariaHideApp={false}
                onRequestClose={this.handleModalClose}
            >
                <Container className={'confirmation-modal-content'}>
                    <Title className={'confirmation-modal-title'}>
                        {requestTranslation('error')}
                    </Title>
                    <Text>
                        {error && error.message}
                    </Text>
                    <ButtonContainer className={'confirmation-modal-actions'}>
                        <button onClick={this.handleModalClose} className='btn btn-lg btn-primary'>OK</button>
                    </ButtonContainer>
                </Container>
            </Modal>
        )
    }
}

const Container = styled.div`
    padding: 30px;
`

const Title = styled.h3`
`

const Text = styled.p`
    text-align: center;
`

const ButtonContainer = styled.div`
`
