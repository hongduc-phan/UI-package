import React from 'react'
import styled from 'styled-components'

const Tag = ({ label, active, onClick, small, highest_group_role,  disabled}) => {
  return (
    <TagDiv
      className='d-flex align-items-center justify-content-center'
      onClick={onClick}
      small={small}
      style={{
        backgroundColor: active ? '#00C3FF' : '#C2D0D7'
      }}
    >
      {label}
    </TagDiv>
  )
}

export default Tag

const TagDiv = styled.div`
  color: white;
  text-transform: uppercase;
  font-size: ${({small}) => small ? '10px' : '11px'};
  padding: ${({small}) => small ? '3px 10px' : '4px 12px;'};
  min-height: ${({small}) => small ? '15px' : '20px'};
  font-weight: 500;
  border-radius: 30px;
  width: fit-content;
  flex-shrink: 0;
  margin-right: ${({small}) => small ? '5px' : '0px'};
  margin-top: ${({small}) => small ? '5px' : '0px'};
  &:hover {
    background-color: #00C3FF;
    cursor: pointer;
  }
`