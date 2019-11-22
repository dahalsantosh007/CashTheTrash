import axios from 'axios';
import {call,put,takeEvery} from 'redux-saga/effects';
import {SEND_EMAIL,TOKEN_RECEIVED} from '../actions/types';

export function *sendCodeAction(postData){
  try{
    const response = yield call (axios.post,'/checkUserStatus',{
      email: postData.payload.enteredEmail,
      userName: postData.payload.enteredUserName
    })
    if(response.data.result === 'found'){
      try{
        const secondResponse = yield call( axios.post, 'http://localhost:5000/sendMail',{
          email: postData.payload.enteredEmail,
        })
        yield put({
                type: TOKEN_RECEIVED,
                payload:secondResponse.data.id
              });
        if(secondResponse.status === 200){
          const thirdResponse = yield call(axios.post, '/logTheCode',{
                    token:secondResponse.data.id,
                    email:postData.payload.enteredEmail,
                    userName: postData.payload.enteredUserName,
                    dateLog: Date.now(),
                  })
        }
      }catch(e){

      }
    }
  }catch(e){

  }

}

export function *requestSendEmail(){
  yield takeEvery(SEND_EMAIL, sendCodeAction);
}
