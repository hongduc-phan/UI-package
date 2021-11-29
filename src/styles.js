// Fair warning / TODO: styles definitely need refactoring.
// At first we started styling with styled components but during the life
// of the project it was decided to switch to bootstrap for Antii to be able to theme the
// app with the bootstrap styles which are present on the drupal side of the app.

// common styled components / styles used in the app
import styled, { createGlobalStyle } from 'styled-components'

export const Z_INDEX_MODAL = 999
export const modalStyles = {
    content: {
        display: 'block',
        background: 'transparent',
        opacity: 1,
        width: '75%',
        height: 'auto',
        maxWidth: '900px',
        borderRadius: '0',
        margin: '0 auto',
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        padding: '50px 0',
        overflow: 'visible',
        border: 'none'
    },
    overlay: {
        backgroundColor: 'rgba(19, 19, 19, 0.8)',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '0',
        top: '0',
        left: '0',
        bottom: 'auto',
        right: 'auto',
        width: '100%',
        height: '100%',
        zIndex: Z_INDEX_MODAL
    }
}

// always on top
export const errorModalStyles = {
    content: {
        ...modalStyles.content,
        overflowY: 'visible',
        overflowX: 'visible',
        overflow: 'visible'
    },
    overlay: {
        ...modalStyles.overlay,
        zIndex: Z_INDEX_MODAL + 1,
        overflow: 'visible'
    }
}

// with padding
export const paddingModalStyles = { content: { ...modalStyles.content, padding: '50px 0' }, overlay: { ...modalStyles.overlay } }

export const confirmDialogModalStyles = { content: { ...modalStyles.content, padding: '50px 50px', maxWidth: '500px' }, overlay: { ...modalStyles.overlay, padding: '50px' } }


const getPhenomenonTypeIndicatorColor = alias => {
    switch (alias) {
        case 'deleting':
            return '#E56869'
        case 'dragged':
        case 'weaksignal':
            return '#a8a8a8'
        case 'cooling':
            return '#0098ff'
        case 'wildcard':
            return '#e95757'
        case 'undefined':
        case 'rising':
        case 'summary':
        default:
            return '#00ca8d'
    }
}

const getIndicatorStyle = type => `
&.${type} {
    .circle, .halo {
        fill: ${getPhenomenonTypeIndicatorColor(type)};
    }
}
`

const baseLabel = `
    font-family: 'L10', Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    text-transform: uppercase;
    font-weight: 400;
    text-align: center;
    line-height: 1;
    justify-content: center;
`

export const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0px;
        /*overflow: hidden;*/
        padding: 0px !important;
    }
    svg.phenomenon-indicator {
        overflow: visible;
        ${getIndicatorStyle('undefined')}
        ${getIndicatorStyle('rising')}
        ${getIndicatorStyle('cooling')}
        ${getIndicatorStyle('wildcard')}
        ${getIndicatorStyle('weaksignal')}
        ${getIndicatorStyle('summary')}
    }
    .phenomenon-indicator .drag-handle {
        fill: transparent !important;
     }
    .dragged .phenomenon-indicator {
        .circle, .halo {
            fill: ${getPhenomenonTypeIndicatorColor('dragged')} !important;
        }
    }
    .deleting .phenomenon-indicator {
        .circle, .halo {
            fill: ${getPhenomenonTypeIndicatorColor('deleting')} !important;
        }
    }
    .phenomenon-disabled {
        opacity: 0.3;
        pointer-events: none;
    }
    .hoverable {
        &:hover {
            cursor: pointer !important;
        }
    }
    .fp-text-icon {
        width: 55px !important;
        height: 24px !important;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        &:hover {
            opacity: 0.7 !important;
        }
    }
    .hidden {
        opacity: 0;
    }
    .fp-select {
        color: black;
    }
    .fp-select.fp-select-border {
        border: 1px solid #eeeeee;
    }

    .fp-select .Select-control {
        border: none;
    }

    .fp-select .Select-placeholder {
        color: black;
        font-weight: 700;
    }

    .fp-select .Select-value-label {
        font-weight: 700;
    }

    .fp-select .Select-arrow {
        border-color: #000 transparent transparent;
    }

    .fp-select .Select-menu-outer {
        box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
        background: #f1f1f3;
        border: none;
        border-radius: 0;
    }

    .fp-select .Select-option {
        background: #f1f1f3;
        color: black;
        font-weight: 400;
        font-size: 1rem;
        padding: 10px 15px;
    }

    .fp-select .Select-option.is-focused {
        background: #f1f1f3;
    }

    .fp-select .Select-menu {
        background: #f1f1f3;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
        border: none;
    }
    .fp-time-select {
        width: 100px;
    }
    .time-select__control {
        border: 0 !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
        border-radius: 0 !important;
    }
    .time-select__indicator-separator {
        display: none !important;
    }
    .time-select__indicator {
        color: rgb(102, 102, 102) !important;
    }
    .time-select__menu {
        position: relative;
        z-index: 999;
    }
    .ReactModal__Content__Wrapper {
        position: relative;
        background-color: #ffffff;
    }
    .ReactModal__Content {
        &:focus {
            outline: none !important;
        }
    }
    .Select-menu-outer {
        z-index: 9999 !important;
    }
    .paddedModal .ReactModal__Content__Wrapper {
        padding: 30px 50px;
    }
    .confirmation-modal-content .confirmation-modal-title {
        text-align: center;
    }

    .confirmation-modal-content .confirmation-modal-actions {
        text-align: center;
        margin-top: 25px;
    }

    .react-datepicker-wrapper {
        display: block;
        width: 100%;
    }

    .react-datepicker-wrapper > div {
        width: 100%
    }

    .narrowPaddedModal .ReactModal__Content__Wrapper {
        padding: 20px;
    }

    .add-users-list .item .af-custom-file-csv {
        margin-top: 6px;
    }
    .add-users-list .item .btn-remove-item {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid red;
        color: red;
        font-size: 16px;
        line-height: 1;
        text-align: center;
        margin-left: 10px;
        margin-top: 6px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fp-checkbox:hover input ~ .checkmark {
        background-color: #ccc;
    }

    .fp-checkbox input:checked ~ .checkmark {
        background: #00C3FF;
        border: 1px solid #00C3FF;
    }

    .fp-checkbox.fp-checkbox-blue input:checked ~ .checkmark {
        background: #1A9AFC;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .fp-checkbox input:checked ~ .checkmark:after {
        display: block;
    }

    .fp-checkbox .checkmark:after {
        left: 7px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .fp-radiobox [type="radio"]:not(:checked) + label:after {
        opacity: 0;
    }
    .fp-radiobox [type="radio"]:checked + label:after {
        opacity: 1;
    }

    .fp-radiobox label {
        margin: 0;
    }
    .fp-radar-select {
        width: 180px;
    }

    .fp-radar-select--no-margin {
        margin-top: 0px;
        width: 300px;
        margin-bottom: 10px;
    }

    .react-toggle--checked .react-toggle-track {
        background-color: #00C3FF !important;
    }
    .fp-checkbox input:checked ~ .checkmark:after {
        display: block;
    }
    .fp-radiobox [type="radio"]:checked,
    [type="radio"]:not(:checked) {
        position: absolute;
        left: -9999px;
    }
    .fp-radiobox [type="radio"]:checked + label,
    .fp-radiobox [type="radio"]:not(:checked) + label
    {
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        line-height: 20px;
        display: flex;
        color: #666;
    }
    .fp-radiobox [type="radio"]:checked + label:before,
    .fp-radiobox [type="radio"]:not(:checked) + label:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        border: 1px solid #ddd;
        border-radius: 100%;
        background: #fff;
    }
    .fp-radiobox [type="radio"]:checked + label:after,
    .fp-radiobox [type="radio"]:not(:checked) + label:after {
        content: '';
        width: 10px;
        height: 10px;
        background: #00C3FF;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 4px;
        border-radius: 100%;
    }
    .fp-radiobox [type="radio"]:not(:checked) + label:after {
        opacity: 0;
    }
    .fp-radiobox [type="radio"]:checked + label:after {
        opacity: 1;
    }
    #fp-radar-page {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    #radar-nav-bottomleft {
        text-shadow: 1.5px 1.5px 0 rgba(0, 0, 0, .2);
    }
    .fp-toast {
        border-radius: 3px !important;
        padding-left: 12px !important;
    }
    .fp-toast .Toastify__toast-body {
        color: black !important;
    }
    .fp-toast .Toastify__close-button--default {
        opacity: 0.8 !important;
    }
    .toast-progress {
        background: #00C3FF !important;
    }
    .sector-label {
        ${baseLabel}
        fill: #FBFBFC;
        &:hover {
            cursor: pointer;
        }
    }
    .noselect {
      -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome, Opera and Firefox */
    }
    .phenomena-label {
        ${baseLabel}
        line-height: 1.2;
        display: flex;
        overflow: visible;
        user-select: none;
    }

    .radar-logo {
        &:hover {
            cursor: pointer;
        }
    }

    .timeline-label {
        ${baseLabel}
        stroke: none;
        font-weight: bold;
    }

    .timeline-label-text {
        ${baseLabel}
        fill: #8d8e92;
        stroke: none;
        font-weight: 500;
        letter-spacing: 2px;
    }
    .tooltip-edit {
        &:hover {
            cursor: pointer;
        }
    }
    .timeline-edit {
        &:hover {
            cursor: pointer;
        }
    }
    .fp-select {
        color: black;
    }

    .fp-select.fp-select-border {
        border: 1px solid #eeeeee;
    }

    .fp-select .Select-control {
        border: none;
    }

    .fp-select .Select-placeholder {
        color: black;
        font-weight: 700;
    }

    .fp-select .Select-value-label {
        font-weight: 700;
    }

    .fp-select .Select-arrow {
        border-color: #000 transparent transparent;
    }

    .fp-select .Select-menu-outer {
        box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
        background: #f1f1f3;
        border: none;
        border-radius: 0;
    }

    .fp-select .Select-option {
        background: #f1f1f3;
        color: black;
        font-weight: 400;
        font-size: 1rem;
        padding: 10px 15px;
    }

    .fp-select .Select-option.is-focused {
        background: #f1f1f3;
    }

    .fp-select .Select-menu {
        background: #f1f1f3;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
        border: none;
    }

    .fp-radar-select .Select-control {
        border-radius: 0;
    }

    .fp-radar-select .Select-menu-outer {
        border-radius: 0;
    }

    .fp-radar-select-hizindex .Select-menu-outer {
        z-index: 25;
    }

    .ReactModal__Overlay {
        -webkit-overflow-scrolling: touch;
        max-height: 100vh;
    }

    .ReactModal__Content__Wrapper {
        position: relative;
        background-color: #ffffff;
    }

    .paddedModal .ReactModal__Content__Wrapper {
        padding: 30px 50px;
    }

    .btn-close-modal {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #006998;
        position: absolute;
        top: -15px;
        right: -15px;
        color: #ffffff;
        line-height: 30px;
        vertical-align: middle;
        text-align: center;
    }

    .btn-close-modal .material-icons {
        font-size: 20px;
        display: inline-block;
        line-height: inherit;
    }
    .fp-user-list {
        min-height: 600px;
    }
      .fp-radiobox [type="radio"]:checked,
    [type="radio"]:not(:checked) {
        position: absolute;
        left: -9999px;
    }
    .fp-radiobox [type="radio"]:checked + label,
    .fp-radiobox [type="radio"]:not(:checked) + label
    {
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        line-height: 20px;
        display: flex;
        color: #666;
    }
    .fp-radiobox [type="radio"]:checked + label:before,
    .fp-radiobox [type="radio"]:not(:checked) + label:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        border: 1px solid #ddd;
        border-radius: 100%;
        background: #fff;
    }
    .fp-radiobox [type="radio"]:checked + label:after,
    .fp-radiobox [type="radio"]:not(:checked) + label:after {
        content: '';
        width: 10px;
        height: 10px;
        background: #00C3FF;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 4px;
        border-radius: 100%;
    }
    .fp-radiobox [type="radio"]:not(:checked) + label:after {
        opacity: 0;
    }
    .fp-radiobox [type="radio"]:checked + label:after {
        opacity: 1;
    }
    .phenomena-checkbox {
        margin-bottom: 0px;
        padding-left: 53px;
    }
    .phenomena-radiobox > label {
        padding-left: 53px !important;
    }
    .undefined {
        position: relative;
        top: 1px;
    }
    .crowd {
        fill: #637282;
    }
    #fp-radar-page {
        .add-phenomena-to-radar {
            height: 75%;
            left: 37px;
            top: 100px;
            width: 50%;
            padding: 0;
            background-color: rgb(242, 244, 244);
            max-width: 350px;
        }
        .phenomena-list-search {
            height: 38px !important;

            input {
                height: 38px;
            }
        }
    }
`
/* eslint-enable */

export const BorderTitleContainer = styled.div`
    padding: 15px 17px;
    border-bottom: 1px solid #e9e9ea;
    background-color: ${({ filtersShown }) => !filtersShown ? 'rgb(242,244,244)' : '#e9e9ea'};
`

export const ListBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(19, 19, 19, 0.8);
    overflow-y: auto;
`

export const ListContainer = styled.div`
    position: absolute;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
    width: 75%;
    max-width: 1150px;
    height: 90%;
    min-height: 520px;
    background: white;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 30px 50px;
 /*   &:hover {
        cursor: pointer;
    }*/
    @media (max-width: 1100px) {
        padding: 15px 25px;
    }
`

export const ListClose = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #126995;
    position: absolute;
    top: -15px;
    right: -15px;
    &:hover {
        cursor: pointer;
    }
`

export const CloseIcon = styled.i`
    font-size: 20px;
    color: white;
`

export const CreateButton = styled.a`
    width: 100%;
`

export const ButtonsContainer = styled.div`
    text-align: right;
    position: static;
    width: 100%;
    bottom: 30px;
    right: 50px;
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    flex-shrink: 0;
`

export const Input = styled.input`
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.3);
    margin-right: 15px;
    font-size: 16px;
    padding-left: 15px;
    border-radius: 1px;
    box-sizing: border-box;
    margin-bottom: 10px;
    z-index: 10;
`

export const ModalContainer = styled.div`
    padding: 30px 50px;
    box-sizing: border-box;

    @media (max-width: 1100px) {
        padding: 15px 25px;
    }
`

export const SelectImageContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
    flex-direction: column;
    align-items: flex-start;
`

export const SelectImageButton = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    border: 1px solid #006998;
    color: #1A9AFC;
    border-radius: 40px;
    background: transparent;
    font-size: 16px;
    font-weight: 500;
    &:hover {
        transition: all 0.4s ease;
        cursor: pointer;
        color: white;
        background-color: #1A9AFC;
    }
`

export const SelectImageInput = styled.input`
    z-index: 20;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    &:hover {
        cursor: pointer;
    }
`

export const SelectImageInputContainer = styled.div`
    position: relative;
    width: 100px;
    height: 40px;
    margin-top: 20px;
`

export const SidePadding = styled.div`
    padding: 0 50px;
    flex-shrink: 0;
    @media (max-width: 1100px) {
        padding: 0 25px;
    }
`

export const SearchInput = styled.input`
    width: 38%;
    min-width: 230px;
    background: transparent;
    font-size: 16px;
    padding-left: 15px;
    padding-right: 15px;
    height: 34px !important;
    border: 1px solid rgb(213, 219, 223);
    box-sizing: border-box;
    margin-top: ${({ small }) => small ? 0 : '20px'};
    z-index: 10;
    position: relative;
    &:placeholder {
        color: black !important;
        opacity: 1;
    }
`

export const FuzeContainer = styled.div`
    width: 250px;
    height: 45px;
    margin-top: 15px;
    margin-bottom: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
    position: relative;
`
export const FuzeInput = styled.input`
    background: white;
    border: none !important;
    padding: 0 10px;
    height: 100%;
`

export const FuzeNListContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

export const ClearSearch = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 8px;
    top: 0;
`
