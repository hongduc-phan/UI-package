import React from 'react'
import styled from 'styled-components'
import MaterialIcon from './MaterialIcon'
import { requestTranslation } from '@sangre-fp/i18n'

const Search = ({
    className,
    value,
    onChange,
    onClear,
    placeholder = requestTranslation('searchByKeywords'),
    searchIcon = true,
    ...inputProps
}) => (
    <SearchContainer className={className}>
        <SearchInput
            type={'text'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...inputProps}
        />
        <ClearSearch className={`${className}__clear`}>
            <MaterialIcon
                fontSize={'20px'}
                onClick={onClear}
                color='#a8a8a8'
            >
                close
            </MaterialIcon>
        </ClearSearch>
        {searchIcon && (
            <SearchIcon>
                <MaterialIcon color='#a8a8a8' fontSize={'20px'}>
                    search
                </MaterialIcon>
            </SearchIcon>
        )}
    </SearchContainer>
)

export default Search

const SearchContainer = styled.div`
    width: 100%;
    height: 45px;
    margin-top: 15px;
    margin-bottom: 30px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 3px 0 rgba(0,0,0,0.05);
    position: relative;
    border-radius: 50px;

    &:hover, &:active, &:focus {
        box-shadow: 0 0 6px 0 rgba(99,114,130,0.30);
    }
`

const SearchInput = styled.input`
    background: white;
    border: none !important;
    padding: 0 25px 0 42px !important;
    height: 100%;
    border-radius: 50px !important;
`

export const ClearSearch = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 0;
`

export const SearchIcon = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 15px;
    top: 0;
`