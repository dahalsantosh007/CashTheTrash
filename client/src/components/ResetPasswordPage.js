import React from 'react';
import {Redirect} from 'react-router-dom';
import ChangePasswordPage from '../components/ChangePasswordPage';
import {getFromStorage} from '../Util/storage';
import {connect} from 'react-redux';
import {sendEmailAction} from '../actions/ResetPasswordAction';
import {getTokenAction} from "../sagas/getTokenSaga";
import {requestSendEmail} from '../actions/types';
import {bindActionCreators} from 'redux';
import Top from './Top'

class ResetPasswordPage extends React.Component{
  componentDidMount(){
    getTokenAction();
  }

  render(){
    const {
      enteredEmail,
      enteredUserName,
      token,
      isLoading,
      tokenReceived,
    } = this.props;

    if(isLoading){
      <div>
        <p>Loading...</p>
      </div>
    }
    const post = {
      enteredEmail: enteredEmail,
      enteredUserName: enteredUserName
    }

    if(!token){
      if(!tokenReceived){
        return(
          <div>
            <div className = 'topChangePasswordPage'>
             <Top/>
            </div>
            <div className = 'changePasswordPage'>
              <div className  = 'changePasswordPageDisplay'>
                <div className = 'conformationOnTop'>
                  Change Your Password
                </div>
                <div className  = 'registerUser'>
                  <input type = "email" placeholder = "Enter your email here" value  = {enteredEmail}
                   onChange = {(event)=>this.props.sendEmailAction(event.target.value,'ENTERED_EMAIL')}/>
                </div>
                <div className  = 'registerUser'>
                  <input type = "text" placeholder = "Enter User Name" value  = {enteredUserName}
                   onChange = {(event)=>this.props.sendEmailAction(event.target.value,'ENTERED_USER_NAME')}/>
                </div>
                <div className  = 'registerUser'>
                  <button onClick = {()=>this.props.requestSendEmail(post)}>Send me the code</button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if(tokenReceived){
        console.log(tokenReceived);
        return(<Redirect to = "/ChangePasswordPage"/>);
      }
    }else{
      return(
        <Redirect to = "/"/>
      )
    }

  }
}

const mapsStateToProps = state =>({
  enteredEmail: state.resetPassword.enteredEmail,
  enteredUserName:state.resetPassword.enteredUserName,
  token: state.login.token,
  isLoading: state.login.isLoading,
  tokenReceived:state.resetPassword.tokenReceived
})

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      sendEmailAction,getTokenAction,requestSendEmail
    }, dispatch)
  }
}

export default connect (mapsStateToProps,mapDispatchToProps)(ResetPasswordPage);
