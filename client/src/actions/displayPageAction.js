import {PRODUCT_NAME,PRODUCT_PRICE,PRODUCT_DESCRIPTION,PRODUCT_ID,QUANTITY} from './types';

export function addProductDetailAction(postData,actions){
  return function(dispatch){
    if(actions ==='PRODUCT_NAME'){
      dispatch({
        type:PRODUCT_NAME,
        payload: postData
      });
    }else if(actions ==='PRODUCT_PRICE'){
      dispatch({
        type:PRODUCT_PRICE,
        payload: postData
      });
    }else if(actions ==='PRODUCT_DESCRIPTION'){
      dispatch({
        type: PRODUCT_DESCRIPTION,
        payload: postData
      });
    }else if(actions ==='PRODUCT_ID'){
      dispatch({
        type: PRODUCT_ID,
        payload: postData
      });
    }else if(actions ==='QUANTITY'){
      dispatch({
        type: QUANTITY,
        payload: postData
      })
    }
  }
}
