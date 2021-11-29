import React from 'react'
import styled from 'styled-components'
import { requestTranslation } from '@sangre-fp/i18n'

const XofYCount = ({ title, count, totalCount, customMargin }) => {
    return (
        <Container>
            <div>
                {title}:
            </div>
            <div>
                <Bolded customMargin={customMargin}>
                {count || 0} {requestTranslation('of')} {totalCount || 0}
                </Bolded> {requestTranslation('inUse')}
            </div>
        </Container>
    )
}

export default XofYCount

const Container = styled.div`
    display: flex;
    padding-bottom: 8px;
    border-bottom: 1.5px solid rgba(0,0,0,0.1);
    margin-bottom: 8px;
    color: black;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`

const Bolded = styled.span`
    font-weight: 700;
    margin-left: ${props => props.customMargin ? '50px' : '40px'};
    color: black;
`
