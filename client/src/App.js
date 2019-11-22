import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import LogInPage from './components/LogInPage';
import RegisterPage from './components/RegisterPage';
import DisplayPage from './components/DisplayPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ChangePasswordPage from './components/ChangePasswordPage';
import AddProductPage from './components/AddProductPage';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render(){
    return(
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Route path = "/" exact component = {LogInPage}/>
            <Route path = "/RegisterPage" exact component = {RegisterPage}/>
            <Route path = "/DisplayPage" exact component = {DisplayPage}/>
            <Route path = "/ResetPasswordPage" exact component = {ResetPasswordPage}/>
            <Route path = "/ChangePasswordPage" exact component = {ChangePasswordPage}/>
            <Route path = "/AddProductPage" exact component = {AddProductPage}/>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
