import {REGISTER_EMAIL,REGISTER_PASSWORD,REGISTER_USER_NAME,REGISTER_CONFIRM_PASSWORD} from './types';

export function getInputAction (postData,actions){
  return function (dispatch){
    if(actions ==='REGISTER_USER_NAME'){
      dispatch({
        type: REGISTER_USER_NAME,
        payload: postData
      });
    }else if(actions ==='REGISTER_PASSWORD'){
      dispatch({
        type:REGISTER_PASSWORD,
        payload: postData
      });
    }else if (actions ==='REGISTER_CONFIRM_PASSWORD'){
      dispatch({
        type: REGISTER_CONFIRM_PASSWORD,
        payload: postData
      })
    }else if(actions ==='REGISTER_EMAIL'){
      dispatch({
        type: REGISTER_EMAIL,
        payload: postData
      })
    }
  }
}
