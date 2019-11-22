import axios from "axios";
import {call,put,takeEvery} from "redux-saga/effects";
import {LOGOUT_ACTION} from '../actions/types.js';
import {getFromStorage,setInStorage} from '../Util/storage';

export function *logOut(){
    function refreshPage(){
      window.location.reload();
    }

    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const token = obj.token;
      try{
        const response = yield call(axios.get,'http://localhost:5000/logout?token='+token);
        if(response.data.success === 'success'){
          localStorage.clear();
          refreshPage();
        }else {
        }
      }catch(e){
      }
    }
}

export function* logOutActions(){
  yield takeEvery(LOGOUT_ACTION, logOut);
}
