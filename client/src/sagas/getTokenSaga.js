import axios from "axios";
import {call, put,takeEvery} from "redux-saga/effects";
import {STORAGE_POST,ISLOADING_POST,GET_TOKEN_ACTION} from '../actions/types.js';
import {getFromStorage,setInStorage} from '../Util/storage';

export function* getToken () {
  console.log('entered');
  const obj = getFromStorage('the_main_app');
  if(obj && obj.token){
    const token = obj.token;
    try {
      const response = yield call(axios.get,'http://localhost:5000/verify?token='+token);
      yield put({type: STORAGE_POST, payload: obj.token});
      yield put({type:ISLOADING_POST, payload: false });
    } catch (e) {
      console.log(e);
    }
  }else{
    yield put({type:ISLOADING_POST, payload: false });
  }
}

export function* getTokenAction(){
  yield takeEvery(GET_TOKEN_ACTION, getToken);
}