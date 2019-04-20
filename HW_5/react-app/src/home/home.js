import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>Popular Computer Science Games</p>
                <div className="container">
                    <ul className="">
                        <li className="center"><NavLink to="/towers of hanoi">Towers of Hanoi</NavLink></li>
                        <li className="center"><NavLink to="/slide puzzle">Slide Puzzle</NavLink></li>
                        <li className="center"><NavLink to="/riddle">Chicken, Fox, Grain Riddle</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Home;