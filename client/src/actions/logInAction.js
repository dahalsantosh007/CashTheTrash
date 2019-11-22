import {LOGINUSERNAME_POST,USERPASSWORD_POST} from './types.js';
import axios from "axios";

export function userNamePosts(postData){
  return function(dispatch){
    dispatch({
      type: LOGINUSERNAME_POST,
      payload: postData
    })
  }
}

export function passwordPosts(postData){
  return function(dispatch){
    dispatch({
      type: USERPASSWORD_POST,
      payload: postData
    })
  }
}