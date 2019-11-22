import {ENTERED_EMAIL,ENTERED_USER_NAME} from './types';

export function sendEmailAction(postData,actions){
  return function (dispatch){
    if(actions === 'ENTERED_EMAIL'){
      dispatch({
        type: ENTERED_EMAIL,
        payload: postData
      });
    } else if(actions === 'ENTERED_USER_NAME'){
      dispatch({
        type: ENTERED_USER_NAME,
        payload: postData
      });
    }
  }
}
