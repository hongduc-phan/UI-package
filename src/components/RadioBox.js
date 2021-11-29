import React from 'react'
import styled from 'styled-components'
import PhenomenonType from './PhenomenonType'

const RadioBox = ({ label = '', value, checked = false, onClick, large = false, className, phenomenaState, disabled, nameRadio }) => {

    return (
        <div className={`fp-radiobox ${className || ''}`} onClick={onClick}>
            <input
                name={`${label}-${nameRadio}`}
                value={value}
                type={'radio'}
                checked={checked}
                readOnly
                disabled={disabled}
            />
            { label !== '' &&
                <PhenomenaLabel
                    style={large ? { fontSize: '16px', paddingLeft: '30px' } : {}}
                >
                    {phenomenaState &&
                        <PhenomenaState>
                            <PhenomenonType
                                halo={phenomenaState.halo}
                                type={phenomenaState.type}
                                size={16}
                                fill={phenomenaState.type.style ? phenomenaState.type.style.color : null}
                            />
                        </PhenomenaState>
                    }
                    {label}
                </PhenomenaLabel>
            }
        </div>
    )
}

const PhenomenaLabel = styled.label`
    display: flex;
    align-items: center;
    color: black !important;
`

const PhenomenaState = styled.div`
    height: 100%;
    width: 25px;
    margin-right: 6px;
    display: flex;
    align-items: center;
`

export default RadioBox
