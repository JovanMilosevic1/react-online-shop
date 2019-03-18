import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// import components
import Navbar from './components/Navbar';
import Details from './components/Details';
import ProductList from './components/ProductList';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Modal from './components/Modal'
class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ProductList}/>
            <Route path="/details" component={Details}/>
            <Route path="/cart" component={Cart}/>
            <Route  component={Default}/>
          </Switch>
          <Modal />
        </React.Fragment>
      </div>
    );
  }
}

export default App;
