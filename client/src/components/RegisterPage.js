import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {getFromStorage} from '../Util/storage';
import DisplayPage from './DisplayPage';
import Top from './Top'
import {connect} from 'react-redux';
import {getInputAction} from '../actions/RegisterPageAction';
import {getTokenAction} from "../sagas/getTokenSaga";
import {requestRegisterUser} from '../actions/types';
import {bindActionCreators} from 'redux';

class RegisterPage extends React.Component{
  componentDidMount(){
    getTokenAction();
  }

  render() {
    const {
      isLoading,
      token,
      registerUserName,
      registerPassword,
      registerEmail,
      confirmPassword,
    }= this.props;

    const post={
      registerUserName:registerUserName,
      registerPassword:registerPassword,
      confirmPassword:confirmPassword,
      registerEmail:registerEmail
    }

    if(isLoading){
      return (<div><p>Loading...</p></div>);
    }

    if (!token){
      return (
        <div>
          <div className = 'topRegisterPage'>
           <Top/>
          </div>
          <form>
            <div className = 'registerPage'>
              <div className = 'registerPageDisplay'>
                <div className = 'registerOnTop'>
                  Register
                </div>
                <div className = 'registerUser'>
                  <input
                    required
                    type = "text"
                    placeholder = "User Name"
                    value = {registerUserName}
                    onChange = {(event)=>this.props.getInputAction(event.target.value,'REGISTER_USER_NAME')}
                  />
                </div>
                <div className = 'registerUser'>
                  <input
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,*]).{6,20}"
                    type = "password"
                    placeholder = "Password"
                    value = {registerPassword}
                    onChange = {(event)=>this.props.getInputAction(event.target.value,'REGISTER_PASSWORD')}
                  />
                </div>
                <div className = 'registerUser'>
                  <input
                    required
                    type = "password"
                    placeholder = "Confirm Password"
                    value = {confirmPassword}
                    onChange = {(event)=>this.props.getInputAction(event.target.value,'REGISTER_CONFIRM_PASSWORD')}
                  />
                </div>
                <div className = 'registerUser'>
                  <input
                    required
                    type = "email"
                    placeholder = "Email Address"
                    value = {registerEmail}
                    onChange = {(event)=>this.props.getInputAction(event.target.value,'REGISTER_EMAIL')}
                  />
                </div>
                <div className = 'registerUser'>
                  <button onClick = {()=>this.props.requestRegisterUser(post)}>Register</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }else{
      return(
        <Redirect to = "/DisplayPage"/>
      );
    }
  }
}

const mapsStateToProps = state =>({
  registerUserName: state.registerPage.registerUserName,
  registerPassword: state.registerPage.registerPassword,
  registerEmail: state.registerPage.registerEmail,
  confirmPassword: state.registerPage.registerConfirmPassword,
  token: state.login.token,
  isLoading: state.login.isLoading
})

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      getInputAction,getTokenAction,requestRegisterUser
    }, dispatch)
  }
}

export default connect(mapsStateToProps,mapDispatchToProps)(RegisterPage);
