import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './components/Login';
{/*import Signup from './components/Signup';*/}

{/*import './App.css';*/}

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Route exact path="/" component={Login}/>
                  {/*<Route exact path="/signup" component={SignUp}/>*/}
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
