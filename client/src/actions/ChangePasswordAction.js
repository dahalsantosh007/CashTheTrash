import {ENTERED_EMAIL,ENTERED_TOKEN,ENTERED_NEW_PASSWORD,ENTERED_USER_NAME} from './types';

export function getInputAction(postData,actions){
  return function(dispatch){
    if(actions === 'ENTERED_EMAIL'){
      dispatch({
        type: ENTERED_EMAIL,
        payload: postData
      });
    } else if(actions === 'ENTERED_TOKEN'){
      dispatch({
        type: ENTERED_TOKEN,
        payload: postData
      });
    }else if(actions === 'ENTERED_NEW_PASSWORD'){
      dispatch({
        type:ENTERED_NEW_PASSWORD,
        payload: postData
      });
    }else if(actions === 'ENTERED_USER_NAME'){
      dispatch({
        type:ENTERED_USER_NAME,
        payload: postData
      });
    }
  }
}
