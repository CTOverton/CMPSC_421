import React, { useEffect, useState } from 'react'
import Board from './Board'
import { observe } from './Game'

/**
 * The Chessboard Tutorial Application
 */
const Ex = () => {
    const [ringPos, setRingPos] = useState(
        [
            [ // Tower 0
                1,
                2,
                3
            ],
            [ // Tower 1
                null,
                null,
                null
            ],
            [ // Tower 2
                null,
                null,
                null
            ],
        ]
    );
    // the observe function will return an unsubscribe callback
    useEffect(() => observe(newPos => setRingPos(newPos)))
    return (
        <div>
            <Board ringPosition={ringPos} />
        </div>
    )
}
export default Ex
