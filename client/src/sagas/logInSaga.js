import axios from "axios";
import {put,call, takeEvery} from "redux-saga/effects";
import {setInStorage} from '../Util/storage';
import {REQUEST_LOGIN_ACTION, LOGGED_USER} from '../actions/types';
import {STORAGE_POST} from '../actions/types.js';

export function *logInActions(postData){
  console.log('response of log in first')

  try {
    const response =  yield call(axios.post,'http://localhost:5000/logIn',
    {
      userName: postData.payload.logInUserName,
      password: postData.payload.logInPassword
    })
    console.log(response);
    const localData = {
      token: response.data.id,
      userName: response.data.userName
    }
    setInStorage('the_main_app',localData);

    yield put({type: STORAGE_POST, payload: response.data.id});
    yield put({type: LOGGED_USER, payload: response.data.userName});

  } catch (e) {

  }

}

export function* requestLogInActions(){
  yield takeEvery(REQUEST_LOGIN_ACTION, logInActions);
}
