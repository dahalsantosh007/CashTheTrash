import axios from 'axios';
import {call,takeEvery} from 'redux-saga/effects';
import {REGISTER_USER} from '../actions/types';

export function* registerAction(postData){
  const response = yield call(axios.post,'http://localhost:5000/register',{
    userName: postData.payload.registerUserName,
    password: postData.payload.registerPassword,
    email:postData.payload.registerEmail
  });
}

export function* requestRegisterUser(){
  yield takeEvery(REGISTER_USER, registerAction);
}
