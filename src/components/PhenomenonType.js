import React from 'react'
import classNames from 'classnames'

const RADIUS_DEFAULT = 9
const RADIUS_UNDEFINED_CENTER = 4
const RADIUS_UNDEFINED = 7
const RADIUS_SUMMARY_CENTER = 8
const RADIUS_SUMMARY_BORDER = 9
const RADIUS_SUMMARY = 11
const RADIUS_CROWD_SOURCED = 7
const RADIUS_MAX = RADIUS_SUMMARY

const ratio = v => v / RADIUS_DEFAULT
const getRadius = (radius, size) => ratio(size) * radius

const getCirclePath = (r, cx, cy) => `
    M ${cx}, ${cy}
    m ${-r}, 0
    a ${r},${r} 0 1,0 ${r * 2},0
    a ${r},${r} 0 1,0 -${r * 2},0
`

const getHaloRadius = (radius, type) => {
    switch (type) {
        case 'undefined':
            return getRadius(radius, RADIUS_UNDEFINED) * 1.4
        case 'summary':
            return getRadius(radius, RADIUS_SUMMARY) * 1.2
        default:
            return getRadius(radius, RADIUS_DEFAULT) * 1.4
    }
}

const Undefined = ({ r, cx, cy, ...props }) => (
    <g>
        <circle r={r}
                cx={cx}
                cy={cy}
                className={'drag-handle'}
        />
        <path d={`
                ${getCirclePath(getRadius(r, RADIUS_UNDEFINED), cx, cy)}
                ${getCirclePath(getRadius(r, RADIUS_UNDEFINED_CENTER), cx, cy)}
              `}
              fillRule={'evenodd'}
              className={'circle'}
              {...props} />
    </g>
)

const Summary = ({ r, cx, cy, ...props }) => (
    <g>
        <circle r={getRadius(r, RADIUS_SUMMARY)}
                cx={cx}
                cy={cy}
                className={'drag-handle'}
        />
        <path d={`
                ${getCirclePath(getRadius(r, RADIUS_SUMMARY), cx, cy)}
                ${getCirclePath(getRadius(r, RADIUS_SUMMARY_BORDER), cx, cy)}
                ${getCirclePath(getRadius(r, RADIUS_SUMMARY_CENTER), cx, cy)}
              `}
              fillRule={'evenodd'}
              className={'circle'}
              {...props} />
    </g>
)

const Default = ({ r, ...props }) => (
    <circle r={getRadius(r, RADIUS_DEFAULT)}
            className={'circle'}
            {...props}/>
)

const Crowd = ({ r, ...props }) => (
  <circle r={getRadius(r, RADIUS_CROWD_SOURCED)} className='circle' {...props} />
)

const getComponent = type => {
    switch (type) {
        case 'undefined':
            return Undefined
        case 'summary':
            return Summary
        case 'crowd':
            return Crowd
        default:
            return Default
    }
}

const Halo = ({ size, type, ...props }) => (
    <circle r={getHaloRadius(size, type)}
            className={'halo'}
            opacity={0.1}
            stroke={'none'}
            {...props}>
        <animate attributeName='opacity'
                 begin='0s'
                 dur='3s'
                 values='0.6; 0.1; 0.6'
                 keyTimes='0; 0.5; 1'
                 repeatCount='indefinite'
                 from={0.1} to={0.6}/>
    </circle>
)

export default ({ type, size, x, y, className, halo, dragged, deleting, fill, watermarkLink, isFPGroup }) => {
    const svgSize = size * (RADIUS_MAX / RADIUS_DEFAULT)
    const cx = svgSize / 2
    const cy = svgSize / 2
    const svgPosition = {}
    if (x) {
        svgPosition.x = x - (svgSize / 2)
    }
    if (y) {
        svgPosition.y = y - (svgSize / 2)
    }
    const classes = classNames(className, 'phenomenon-indicator', type, { dragged, deleting })

    const Component = getComponent(type)
    return (
        <svg className={classes}
             width={svgSize}
             height={svgSize}
             {...svgPosition}
             fill={fill}>
            {halo && (
                <Halo r={getHaloRadius(size / 2, type)}
                        cx={cx}
                        cy={cy}/>
            )}
            <Component r={size / 2}
                       cx={cx}
                       cy={cy}
                       className={'circle'}
                       fill={fill}
            />
            {
                !!isFPGroup && (<image
                    x={cx - size / 2}
                    y={cy - size / 2}
                    width={size}
                    height={size}
                    xlinkHref={watermarkLink}
                    style={{opacity: 0.8}}
                />)
            }
        </svg>
    )
}
