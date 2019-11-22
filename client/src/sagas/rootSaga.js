import {requestLogInActions} from './logInSaga';
import {getTokenAction} from './getTokenSaga';
import {all} from "redux-saga/effects";
import {displayData} from './displayPageSaga';
import {addProductActions} from './addProductSaga';
import {logOutActions} from './logOutSaga';
import {getLoggedUser} from './loggedUserSaga';
import {requestSendEmail} from './passwordChangeSaga';
import {requestRegisterUser} from './registerSaga';
import {requestChangePassword} from './changePasswordSaga';

export default function* rootSaga() {
  yield all([
    getTokenAction(),
    requestLogInActions(),
    displayData(),
    addProductActions(),
    logOutActions(),
    getLoggedUser(),
    requestSendEmail(),
    requestRegisterUser(),
    requestChangePassword()
  ]);
}
