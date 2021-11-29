import _ from 'lodash'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import MaterialIcon from './MaterialIcon'

const PREVIOUS_PAGE = -1
const NEXT_PAGE = 1
const MAX_VISIBLE_PAGES = 10

export default class Pagination extends PureComponent {
    handlePageClick(direction) {
        const { page, length, onPageChange } = this.props
        const prev = page - 1
        const next = page + 1

        if (direction === PREVIOUS_PAGE && prev > 0) {
            onPageChange(prev)
        } else if (direction === NEXT_PAGE && (page < length)) {
            onPageChange(next)
        }
    }

    pageGenerator = index => {
        const { page, length } = this.props
        const nonZeroIndex = index + 1
        const middle = MAX_VISIBLE_PAGES / 2
        const listLength = _.ceil(length)

        // page < middle works because the function that calls this function already
        // runs the appropriate amount of times

        if (listLength < MAX_VISIBLE_PAGES || page < middle) {
            return nonZeroIndex
        }

        if (middle + page > listLength) {
            return listLength - MAX_VISIBLE_PAGES + nonZeroIndex
        }

        return page - middle + nonZeroIndex
    }

    render() {
        const { page, onPageChange, length } = this.props
        const maxVisiblePages = _.ceil(length) >= MAX_VISIBLE_PAGES ? MAX_VISIBLE_PAGES : _.ceil(length)
        const mapArr = _.times(maxVisiblePages, this.pageGenerator)

        return (
            <Container>
                <MaterialIcon
                    onClick={() => this.handlePageClick(PREVIOUS_PAGE)}
                    size={'20px'}
                >
                    arrow_left
                </MaterialIcon>
                {mapArr.map(pageToRender => (
                    <PageNumber
                        key={pageToRender}
                        active={page === pageToRender}
                        onClick={() => onPageChange(pageToRender)}
                    >
                        {pageToRender}
                    </PageNumber>
                ))}
                <MaterialIcon
                    size={'20px'}
                    onClick={() => this.handlePageClick(NEXT_PAGE)}
                >
                    arrow_right
                </MaterialIcon>
            </Container>
        )
    }
}


const Container = styled.div`
    display: flex;
    margin-right: 20px;
`

const PageNumber = styled.button`
    margin: 0 6px;
    font-weight: ${props => props.active ? '700' : '500'};
    border: none;
    font-size: ${props => props.active ? '15px' : '14px'};
    color: ${props => props.active ? 'black' : 'gray'};
`
