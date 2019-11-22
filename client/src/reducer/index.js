import {combineReducers} from 'redux';
import logInReducer from './logInReducer';
import displayPageReducer from './displayPageReducer';
import ChangePasswordReducer from './ChangePasswordReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
import RegisterPageReducer from './RegisterPageReducer';
import loggedUserReducer from './loggedUserReducer';

export default combineReducers({
  login:logInReducer,
  displayPage: displayPageReducer,
  changePassword: ChangePasswordReducer,
  resetPassword: ResetPasswordReducer,
  registerPage: RegisterPageReducer,
  loggedUser: loggedUserReducer
})
