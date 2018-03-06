import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Route exact path="/" component={Login}/>
                  <Route exact path="/signup" component={Signup}/>
                  <Route exact path="/home" component={Home}/>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
