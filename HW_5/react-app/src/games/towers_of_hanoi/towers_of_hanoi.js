import React, {Component} from 'react'
import Tower from './Tower'
import Target from "./Target"

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import './towers_of_hanoi.css'

class towers_of_hanoi extends Component {
    state = {
        win: false,
        from: null,
        to: null,
        towers: [
            {id: 0, name: 'Tower 0', rings: [1,2,3]},
            {id: 1, name: 'Tower 1', rings: [null,null,null]},
            {id: 2, name: 'Tower 2', rings: [null,null,null]}
        ],
        winState: [1,2,3]
    }

    moveRing = (fromTower, toTower) => {
        let ring = this.getTopRing(fromTower);
        let other = this.getTopRing(toTower);
        let towers = this.state.towers;
            if (ring.value !== null) {
                if (other.value == null) {
                    towers[fromTower].rings[ring.height] = null;
                    towers[toTower].rings[other.height] = ring.value;
                    // ringPositions[fromTower][ring.height] = null;
                    // ringPositions[toTower][other.height] = ring.value;
                } else {
                    if (ring.value < other.value) {
                        if (other.height-1 !== -1 && towers[toTower].rings[other.height-1] == null) {
                            towers[fromTower].rings[ring.height] = null;
                            towers[toTower].rings[other.height-1] = ring.value;
                            // ringPositions[fromTower][ring.height] = null;
                            // ringPositions[toTower][other.height-1] = ring.value;
                        }
                    }
                }
                this.setState({
                    towers: towers
                });
                if (JSON.stringify(this.state.towers[2].rings) == JSON.stringify(this.state.winState)){
                    this.setState({
                        win: true
                    })
                    console.log(this.state.win)
                }
            }
    };

    getTopRing = (tower) => {
        for (let i = 0; i<this.state.towers[tower].rings.length; i++) {
            if (this.state.towers[tower].rings[i] != null) {
                return {
                    height: i,
                    value: this.state.towers[tower].rings[i]
                }
            }
        }
        return {
            height: 2,
            value: null
        };
    };


    render() {
        return (
            <div>
                <div className="container">
                    <h1>Towers of Hanoi</h1>
                    <p>The objective of the puzzle is to move the entire stack to the last tower, obeying the following simple rules:</p>
                    <ul>
                        <li>- Only one disk can be moved at a time.</li>
                        <li>- Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty tower.</li>
                        <li>- No larger disk may be placed on top of a smaller disk.</li>
                    </ul>

                    <div className="game-container">
                        {this.state.towers.map((item, index) => (
                            <Target key={index} handleDrop={(from, to) => {
                                this.moveRing(from, to);
                            }}>
                                <Tower key={item.id} item={{item}}/>
                            </Target>
                        ))}
                    </div>
                    <p>{(this.state.win) ? 'You win!' : ''}</p>
                </div>
            </div>
        )
    }
}

// export default towers_of_hanoi;
export default DragDropContext(HTML5Backend)(towers_of_hanoi);