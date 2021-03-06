import React from 'react'
import styled from 'styled-components'

const CheckBox = ({
    label = '',
    type = 'checkbox',
    checked = false,
    onChange,
    blue = false,
    className = '',
    disabled,
    highest_group_role
}) => {

    return (
        <Container blue={blue} className={`${blue ? 'fp-checkbox fp-checkbox-blue' : 'fp-checkbox'} ${className}`}>
            <Input
                type={type}
                value={label}
                checked={checked}
                onChange={onChange}
                highest_group_role={highest_group_role}
                disabled={disabled}
            />
            <CheckMark className='checkmark' />
            { label !== '' &&
                <Label>{label}</Label>
            }
        </Container>
    )
}

const Container = styled.label`
    position: relative;
    padding-left: 35px;
    margin-bottom: ${props => props.blue ? '8px' : '20px'};
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;
`

const Input = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`

const CheckMark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 21px;
    width: 21px;
    border: 1px solid #cccccc;
    background-color: white;
`

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 0;
    pointer-events: none;
`

export default CheckBox
