import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logOutActions} from '../actions/types';
import {getLoggedUser} from '../sagas/loggedUserSaga';
import {getFromStorage,setInStorage} from '../Util/storage';


class Top extends React.Component{
  componentDidMount(){
    getLoggedUser()
  }

  render(){
    const token = getFromStorage('the_main_app');
    console.log(token);
    const{
      loggedUserName
    } = this.props;

    if (!token.token){
      return(
        <div>
        <Redirect to = "/"/>
      </div>
      )
    }

    if(token.userName === undefined){
      return(
        <div className = 'top'>
            <div className= 'test'><Link to ='/helpContactPage'>Help & Contact </Link>| Hi !
              <DropdownMenu className = 'dropdwn' triggerType='icon' trigger='glyphicon glyphicon-triangle-bottom' fadeIn="true">
                <MenuItem text="Home" location="/" />
                <MenuItem text="Change Password" location="/ResetPasswordPage" />
              </DropdownMenu>
            </div>
        </div>
      )
    }else{
      return(
        <div className = 'top'>
            <div className= 'test'><Link to ='/addProductPage'>Add Product </Link>| Hi, {token.userName}!
              <DropdownMenu userName={token.userName} triggerType='icon' trigger='glyphicon glyphicon-triangle-bottom' fadeIn="true">
                <MenuItem text="Home" location="/DisplayPage" />
                <MenuItem text="Change Password" location="/ResetPasswordPage" />
                <MenuItem text="Logout" onClick={()=>this.props.logOutActions()} />
              </DropdownMenu>
            </div>
        </div>
      )
    }
  }
}

const mapStatesToProps = state => ({
  loggedUserName : state.loggedUser.loggedUserName
})

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      logOutActions
    }, dispatch)
  }
}

export default connect(mapStatesToProps,mapDispatchToProps)(Top);
