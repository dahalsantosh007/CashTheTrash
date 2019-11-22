import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import DisplayPage from './DisplayPage';
import {getFromStorage} from '../Util/storage';
import {connect} from 'react-redux';
import {getInputAction} from '../actions/ChangePasswordAction';
import {getTokenAction} from "../sagas/getTokenSaga";
import {requestChangePassword} from '../actions/types';
import {bindActionCreators} from 'redux';
import Top from './Top'

class ChangePasswordPage extends React.Component{
  componentDidMount(){
    getTokenAction();
  }

  render(){
    const{
      enteredToken,
      enteredEmail,
      enteredNewPassword,
      enteredUserName,
      token,
      isLoading
    } = this.props;

    const post ={
      enteredToken:enteredToken,
      enteredEmail:enteredEmail,
      enteredNewPassword:enteredNewPassword,
      enteredUserName:enteredUserName
    }

    if(isLoading){
      return(
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if(!token){
      return(
        <div>
          <div className = 'topChangePasswordPage'>
           <Top/>
          </div>
          <div className = 'changePasswordPage'>
            <div className  = 'changePasswordPageDisplay'>
              <div className = 'conformationOnTop'>
                Conformation Page
              </div>
              <div className = 'registerUser'>
                <input type = 'text' placeholder = 'Enter you email address' value = {enteredEmail}
                 onChange = {(event)=>this.props.getInputAction(event.target.value,'ENTERED_EMAIL')}/>
              </div>
              <div className = 'registerUser'>
                <input type = 'text' placeholder = 'Enter the token' value = {enteredToken}
                 onChange = {(event)=>this.props.getInputAction(event.target.value,'ENTERED_TOKEN')}/>
              </div>
              <div className = 'registerUser'>
                <input type = 'text' placeholder = 'Enter User Name' value = {enteredUserName}
                 onChange = {(event)=>this.props.getInputAction(event.target.value,'ENTERED_USER_NAME')}/>
              </div>
              <div className = 'registerUser'>
                <input type = 'password' placeholder = 'Enter new password' value = {enteredNewPassword}
                 onChange = {(event)=>this.props.getInputAction(event.target.value,'ENTERED_NEW_PASSWORD')}/>
              </div>
              <div className = 'registerUser'>
                <button onClick = {()=>this.props.requestChangePassword(post)}>Change the Password</button>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return(
        <Redirect to = "/DisplayPage"/>
      )
    }
  }
}

const mapsStateToProps = state =>({
  enteredToken: state.changePassword.enteredToken,
  enteredEmail: state.changePassword.enteredEmail,
  enteredNewPassword: state.changePassword.enteredNewPassword,
  enteredUserName:state.changePassword.enteredUserName,
  token: state.login.token,
  isLoading: state.login.isLoading
})

function mapDispatchToProps(dispatch){
  return{
    ...bindActionCreators({
      getInputAction,getTokenAction,requestChangePassword
    },dispatch)
  }
}
export default connect(mapsStateToProps,mapDispatchToProps)(ChangePasswordPage);
