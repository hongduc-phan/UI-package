import React from 'react'
import styled from 'styled-components'

const MaterialIcon = ({
    children,
    fontSize = '24px',
    color = 'black',
    onClick = false,
    disabled = false,
    className = ''
}) => (
    <Icon
        style={{
            fontSize,
            color
        }}
        onClick={onClick ? onClick : null}
        className={`material-icons ${className}`}
        disabled={disabled}
    >
        {children}
    </Icon>
)

const Icon = styled.i`
    opacity: ${props => props.disabled ? '0.7' : '1'};
    pointer-events: ${props => props.disabled ? 'none' : 'all'};

    &:hover {
        opacity: 0.7;
        cursor: ${props => props.disabled ? 'default' : 'pointer'};
    }
`

export default MaterialIcon
