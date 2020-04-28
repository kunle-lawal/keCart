import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import ShoppingList from './components/dashboard/ShoppingList'
import Header from './components/layout/Header'
import BottomStrip from './components/layout/BottomStrip'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main_container">
          <Header/>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/list/:id' component={ShoppingList} />
            </Switch>
          </BrowserRouter>
          <BottomStrip/>
        </div>
      </div>
    );
  }
}

export default App;
