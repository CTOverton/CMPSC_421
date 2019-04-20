import React from 'react'

const Board = ({ringPosition}) => {
    console.log(ringPosition)
    return (
        <div>
            <div>{ringPosition[0]}</div>
            <div>{ringPosition[1]}</div>
            <div>{ringPosition[2]}</div>
        </div>
    )
}
export default Board