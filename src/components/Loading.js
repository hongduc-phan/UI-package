import React from 'react'
import ReactLoading from 'react-loading'
import styled from 'styled-components'

const Loading = ({ shown, color = 'black' }) => {
    return (
        <LoadingContainer shown={shown}>
            <ReactLoading type='spin' color={color} height={50} width={50} />
        </LoadingContainer>
    )
}

const LoadingContainer = styled.div`
    display: ${ props => props.shown ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    z-index: 99999;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
    pointer-events: none;
`

export default Loading
