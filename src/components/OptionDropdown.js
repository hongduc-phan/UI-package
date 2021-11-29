import _ from 'lodash'
import React from 'react'
import Select from 'react-select'
import MaterialIcon from './MaterialIcon'
import RadioBox from './RadioBox'
import Checkbox from './Checkbox'
import PhenomenonType from './PhenomenonType'
import Tag from './Tag'
import { requestTranslation } from '@sangre-fp/i18n'
import styled from 'styled-components'

export const TimelineOptionDropdown = props => {
    const {
        label: title,
        title: label,
        onTabClick,
        optionsShown,
        selectedOption: {min, max},
        type = 'radio',
        group,
        language,
        handleOptionSelect,
        disabled,
        highest_group_role
    } = props

    const createOptions = (first = 'true') => {
        const currentYear = new Date().getFullYear()
        const maxYear = currentYear + 100

        return first ? _.range(2018, maxYear) : _.range(min + 1, maxYear)
    }

    const handleMinOptionChange = ({ value }) => {
        handleOptionSelect({ min: value, max: value > max ? null : max })
    }
    const handleMaxOptionChange = ({ value }) => handleOptionSelect({ min, max: value })

    const minOptions = createOptions(true)
    const maxOptions = createOptions(false)

    return (
        <div className='w-100'>
            <Tab onClick={onTabClick}>
                <div style={{ width: '90%' }}>
                    <OptionDropdownTitle>{typeof title === 'string' && title.toUpperCase()}</OptionDropdownTitle>
                    <OptionDropdownLabel>{label}</OptionDropdownLabel>
                </div>
                <MaterialIcon color={'#666666'}>
                    {optionsShown ? 'arrow_drop_up' : 'arrow_drop_down'}
                </MaterialIcon>
            </Tab>
            { optionsShown &&
                <OptionsList
                    className={'flex-column flex-nowrap pb-3'}
                    style={{ overflow: 'visible' }}
                >
                    <div className='d-flex align-items-center mt-3'>
                        <div className='ml-3' style={{ width: '50px' }}>{requestTranslation('from')}</div>
                        <Select
                            className='fp-time-select fp-select'
                            classNamePrefix={'time-select'}
                            value={{value: min, label: min}}
                            onChange={handleMinOptionChange}
                            options={minOptions.map(option => ({ value: option, label: option }))}
                            highest_group_role={highest_group_role}
                            isDisabled={disabled}
                        />
                    </div>
                    <div className='d-flex align-items-center mt-3'>
                        <div className='ml-3' style={{ width: '50px' }}>{requestTranslation('to')}</div>
                        <Select
                            className='fp-time-select fp-select'
                            classNamePrefix='time-select'
                            value={{value: max, label: max}}
                            onChange={handleMaxOptionChange}
                            options={maxOptions.map(option => ({ value: option, label: option }))}
                            highest_group_role={highest_group_role}
                            isDisabled={disabled}
                        />
                    </div>
                </OptionsList>
            }
        </div>
    )
}

export const TagOptionDropdown = props => {
    const {
        label: title,
        title: label,
        onTabClick,
        optionsShown,
        selectedOption,
        type = 'radio',
        group,
        language,
        handleOptionSelect,
        countShown = true,
        useTags,
        disabled,
        isRadar,
        groupFromRadarApp

    } = props
    const { loading, tags, error } = useTags((group < 0 && !!isRadar) ? (typeof groupFromRadarApp === 'object' ? groupFromRadarApp?.id : groupFromRadarApp) : group )
    let [ fpTags, groupTags ] = tags

    if (fpTags && groupTags) {
        fpTags = fpTags.map(({ uri, label }) => ({ value: uri, label }))
        groupTags = groupTags.map(({ uri, label }) => ({ value: uri, label }))
    }

    const lang = language === 'all' ? document.querySelector('html').getAttribute('lang') || 'en' : language

    return (
        <div className='w-100'>
            <Tab onClick={onTabClick}>
                {countShown && _.isArray(selectedOption) && !!selectedOption.length && (
                    <TabCount className='d-flex align-items-center justify-content-center'>
                        {selectedOption.length}
                    </TabCount>
                )}
                <div style={{ width: '90%' }}>
                    <OptionDropdownTitle>{title.toUpperCase()}</OptionDropdownTitle>
                    <OptionDropdownLabel>{label}</OptionDropdownLabel>
                </div>
                <MaterialIcon color={'#666666'}>
                    {optionsShown ? 'arrow_drop_up' : 'arrow_drop_down'}
                </MaterialIcon>
            </Tab>
            {optionsShown && loading && (<OptionsList className='pl-2 pt-2'>{requestTranslation('loading')}</OptionsList>)}
            {optionsShown && error && (<OptionsList className='pl-2 pt-2'>{requestTranslation('tagLoadingError')}</OptionsList>)}
            {optionsShown && !loading && (
                <OptionsList className={'flex-column flex-nowrap'} style={{opacity: disabled ? 0.5 : 1, position: 'relative'}}>
                    {disabled && <div style={{width: '100%', height: '100%', position: 'absolute', zIndex: 99}}> </div> }
                        {!!groupTags && !!groupTags.length && (
                                <div style={{overflowY: disabled ? 'hidden': 'unset'}}>
                                    <TagLabel className='mb-0 mt-2 ml-2'>{requestTranslation('groupTags')}</TagLabel>
                                    <div className={'d-flex flex-wrap flex-row'}>
                                        {groupTags?.map((tag, index) => {

                                            return (
                                                <OptionsListItem key={index} style={{ padding: '0 5px' }}>
                                                    <Tag
                                                        label={tag.label}
                                                        active={_.find(selectedOption, o => o.label === tag.label)}
                                                        onClick={() => handleOptionSelect(tag)}
                                                    />
                                                </OptionsListItem>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        }
                    <div style={{overflowY: disabled ? 'hidden': 'unset'}}>
                        <TagLabel className='mb-0 mt-2 ml-2'>{requestTranslation('fpTags')}</TagLabel>
                        <div className={`d-flex flex-wrap flex-row`}>
                            {fpTags.length ? fpTags.map((tag, index) => {
                                return (
                                    <OptionsListItem key={index} style={{ padding: '0 5px' }}>
                                        <Tag
                                            label={tag.label[lang]}
                                            active={_.find(selectedOption, o => o.label[lang] === tag.label[lang])}
                                            onClick={() => handleOptionSelect(tag)}
                                        />
                                    </OptionsListItem>
                                )})
                            : null}
                        </div>
                    </div>
                </OptionsList>
            )}
        </div>
    )
}

const OptionDropdown = props => {
    const renderOptionByType = (props, option) => {
        const { selectedOption, handleOptionSelect, type = 'radio', disabled, highest_group_role, nameRadio } = props
        const { label, value, style } = option
        
        switch(type) {
            case 'radio':
                return (
                    <RadioBox
                        nameRadio={nameRadio}
                        label={label}
                        value={label}
                        checked={selectedOption.label === label}
                        onClick={handleOptionSelect}
                        disabled={props.disabled}
                        highest_group_role={props.highest_group_role}
                    />
                )
            case 'type':
                return (
                    <StateContainer key={value}>
                        <PhenomenaState>
                            <PhenomenonType type={label} size={16} fill={style ? style.color : null}/>
                        </PhenomenaState>
                        <Checkbox
                            label={requestTranslation(label) ? requestTranslation(label) : label}
                            value={value}
                            checked={_.find(selectedOption, o => o.value === value)}
                            onChange={() => handleOptionSelect(option)}
                            className='phenomena-checkbox'
                            disabled={disabled}
                            highest_group_role={highest_group_role}
                        />
                    </StateContainer>
                )
            default:
                return (
                    <Checkbox
                        label={_.capitalize(label)}
                        value={value}
                        checked={_.find(selectedOption, o => o.label === label)}
                        onChange={() => handleOptionSelect(option)}
                        className='mt-0 mb-0'
                        disabled={disabled}
                        highest_group_role={highest_group_role}
                    />
                )
        }
    }

    const {
        label: title,
        title: label,
        onTabClick,
        optionsShown,
        options,
        fpTagOptions,
        selectedOption,
        type = 'radio',
        resetFilters,
        countShown = true,
        disabled,
        highest_group_role
    } = props

    return (
        <div className='w-100'>
            <Tab onClick={onTabClick}>
                {countShown && _.isArray(selectedOption) && !!selectedOption.length && (
                    <TabCount className='d-flex align-items-center justify-content-center'>
                        {selectedOption.length}
                    </TabCount>
                )}
                <div style={{ width: '90%' }}>
                    <OptionDropdownTitle>{typeof title === 'string' && title.toUpperCase()}</OptionDropdownTitle>
                    <OptionDropdownLabel>{label}</OptionDropdownLabel>
                </div>
                <MaterialIcon color={'#666666'}>
                    {optionsShown ? 'arrow_drop_up' : 'arrow_drop_down'}
                </MaterialIcon>
            </Tab>
            { optionsShown &&
                <OptionsList className={'flex-column flex-nowrap'} style={{ position: 'relative'}}>
                    {disabled && <div style={{width: '100%', height: '100%', position: 'absolute', zIndex: 99}}> </div> }
                    <div className={'d-flex flex-column flex-nowrap'}>
                        {options.length && options.map(option => (
                            <OptionsListItem key={option.value} className={'w-100'} style={{opacity: highest_group_role === 'free' ? 0.5 : 1}}>
                                {renderOptionByType(props, option)}
                            </OptionsListItem>
                        ))}
                    </div>
                    {/* {type === 'type' && ( */}
                    {/*     <button onClick={resetFilters} className='btn btn-outline-secondary mt-3 mr-3 ml-3'>{requestTranslation('resetTypes')}</button> */}
                    {/* )} */}
                </OptionsList>
            }
        </div>
    )
}

export default OptionDropdown

const TagLabel = styled.div`
    font-size: 12px;
    color: #667585;
`

const Tab = styled.div`
    width: 100%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
    background: white;
    min-height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 12px;
    padding-right: 5px;
    padding-top: 8px;
    padding-bottom: 8px;
    position: relative;
    &:hover {
        cursor: pointer;
    }
`

const TabCount = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    color: white;
    background-color: #637182;
    position: absolute;
    left: -6px;
    top: -6px;
    font-size: 9px;
`

const OptionDropdownTitle = styled.div`
    color: #666666;
    font-weight: 500;
    font-size: 11px;
`

const OptionDropdownLabel = styled.div`
    font-weight: 700;
    color: black;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
`

const OptionsList = styled.div`
    display: flex;
    background: #F6F4F7;
    width: 100%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05);
    padding-bottom: 8px;
    max-height: 260px;
    overflow: auto;
    flex-wrap: wrap;
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-thumb {
      background: #ECECEC;
      border-radius: 20px;
    }

    ::-webkit-scrollbar-track {
      background: white;
      border-radius: 20px;
    }
`

const OptionsListItem = styled.div`
    padding: 0 12px;
    display: flex;
    align-items: center;
    margin-top: 8px;
`

const StateContainer = styled.div`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    position: relative;
`

const PhenomenaState = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    position: absolute;
    z-index: 10;
    left: 27px;
    pointer-events: none;
`