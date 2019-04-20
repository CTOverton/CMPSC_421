import React from 'react'
import {Link, NavLink} from "react-router-dom";

const navbar = () => {
    return (
        <div>
            <nav className="nav-wrapper blue darken-3">
                <Link to="/" className="brand-logo center hide-on-med-and-down">Overton</Link>
                {/*<a href="#" data-target="side_nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>*/}
                <ul className="right">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/towers of hanoi">Towers of Hanoi</NavLink></li>
                    <li><NavLink to="/slide puzzle">Slide Puzzle</NavLink></li>
                    <li><NavLink to="/riddle">Chicken, Fox, Grain Riddle</NavLink></li>
                    <li><NavLink to="/chess">Chess</NavLink></li>
                </ul>
            </nav>

            {/*<ul id="side_nav" className="sidenav">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/towers of hanoi">Towers of Hanoi</NavLink></li>
                <li><NavLink to="/slide puzzle">Slide Puzzle</NavLink></li>
                <li><NavLink to="/riddle">Chicken, Fox, Grain Riddle</NavLink></li>
            </ul>*/}

        </div>
    )
};

export default navbar;