import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";

import NavBar from "./components/navbar";
import Home from "./home/home";
import Game_Towers from "./games/towers_of_hanoi/towers_of_hanoi";
import Game_slide from "./games/slide_puzzle/slide_puzzle";
import Game_riddle from "./games/riddle/riddle";
import chess from "./games/chess/chess";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>*/}

          <BrowserRouter>
              <div className="App">
                  <NavBar/>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/towers of hanoi' component={Game_Towers} />
                  <Route exact path='/slide puzzle' component={Game_slide} />
                  <Route exact path='/riddle' component={Game_riddle} />
                  <Route exact path='/chess' component={chess} />
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
