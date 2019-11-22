import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {getFromStorage,setInStorage} from '../Util/storage';
import DisplayPage from './DisplayPage';
// import ResetPasswordPage from '/Users/santoshdahal/Documents/cash-the-trash/client/src/components/RegisterPage.js';
import {connect} from 'react-redux';
import {userNamePosts,passwordPosts} from '../actions/logInAction';
import {bindActionCreators} from 'redux';
import {requestLogInActions,getTokenAction} from '../actions/types';

class LogInPage extends React.Component{
  componentDidMount(){
  }

  handleClick(e){
    e.preventDefault();
    console.log('The link was clicked.');
  }

  render() {
    const{
      logInUserName,
      logInPassword,
      token,
      isLoading
    } = this.props;


    const post = {
      logInUserName: this.props.logInUserName,
      logInPassword: this.props.logInPassword
    }

    if(isLoading){
      return (<div><p>Loading...</p></div>);
    }

    if(token==""){
      return (
        <form onSubmit = {(e)=>this.handleClick(e)}>
          <div className = 'LogInPage'>
            <div className = 'LogInBox'>
              <div>
                <div className = 'companyName'>
                  Cash The Trash
                </div>
                  <div className = 'loginInput'>
                    <input
                      required
                      type = "text"
                      placeholder = "User Name"
                      value = {logInUserName}
                      onChange = {(event)=>this.props.userNamePosts(event.target.value)}
                      id = 'loginInputText'
                    />
                  </div>
                  <div className = 'loginInput'>
                    <input
                      required
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,*]).{6,20}"
                      type = "password"
                      placeholder = "Password"
                      value = {logInPassword}
                      onChange = {(event)=>this.props.passwordPosts(event.target.value)}
                      id = 'loginInputPassword'
                    />
                  </div>
                  <div className = 'loginButton'>
                    <button onClick = {()=>
                      this.props.requestLogInActions(post)
                    } id = 'loginButtonId'>Log In</button>
                  </div>
                  <div className = 'registerButton'>
                    <br/><br/>
                    <Link to = "/RegisterPage"><button>Register</button></Link>
                  </div>
                  <div className = 'resetPasswordPageButton'>
                    <br/><br/>
                    <Link to = "/ResetPasswordPage"><button>Forgot Password</button></Link>
                  </div>
              </div>
            </div>
          </div>
        </form>
      );
    }
    
    if(token){
      return(
        <div>
        <Redirect to = "/DisplayPage"/>
      </div>
      );
    }
  }
}
const mapStatesToProps = state =>({
  isLoading: state.login.isLoading,
  token:state.login.token,
  logInUserName: state.login.logInUserName,
  logInPassword: state.login.logInPassword
})

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      requestLogInActions,userNamePosts,passwordPosts,getTokenAction
    }, dispatch)
  }
}

export default connect(mapStatesToProps,mapDispatchToProps)(LogInPage);
