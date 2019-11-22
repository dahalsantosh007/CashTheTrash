import axios from 'axios';
import {call,takeEvery} from 'redux-saga/effects';
import {CHANGE_PASSWORD,STORAGE_POST} from '../actions/types';

export function *changePasswordAction(postData){
  try{
    const response = yield call(axios.post,'http://localhost:5000/changePassword',{
      email : postData.payload.enteredEmail,
      password : postData.payload.enteredNewPassword,
      token : postData.payload.enteredToken,
      userName: postData.payload.enteredUserName
    });
  }catch(e){

  }
}

export function *requestChangePassword(){
  yield takeEvery(CHANGE_PASSWORD,changePasswordAction);
}
