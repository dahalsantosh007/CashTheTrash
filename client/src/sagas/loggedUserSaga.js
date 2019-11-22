import axios from "axios";
import {call,put} from "redux-saga/effects";
import {LOGGED_USER} from '../actions/types';

export function *getLoggedUser(){
  try {
    const response = yield call(axios.get,'http://localhost:5000/checkLoggedUser');
    yield put({type: LOGGED_USER, payload: response.data.data.userName});
  } catch (e) {
  }
}
