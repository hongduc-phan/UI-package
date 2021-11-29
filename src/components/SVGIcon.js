import React from 'react'

const SVGIcon = ({ x, y, icon, fontSize, style }) => (
    <foreignObject
        x={x - fontSize / 2}
        y={y - fontSize / 2}
        width={fontSize}
        height={fontSize}
    >
        <div
            className={'material-icons'}
            style={{ color: 'white', fontSize: `${fontSize}px`, ...style }}
            x={x}
            y={y + (fontSize / 2)}
            textAnchor={'middle'}
        >
            {icon}
        </div>
    </foreignObject>
)

export default SVGIcon
