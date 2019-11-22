import axios from "axios";
import {call,takeEvery} from "redux-saga/effects";
import {ADD_PRODUCT_ACTION} from '../actions/types';

export function *addProduct(postData){
  function refreshPage(){
    window.location.reload();
  }
  try{
    const response = yield call(axios.post,'http://localhost:5000/addProduct',{
      productName: postData.payload.productName,
      productPrice: postData.payload.productPrice,
      productId: postData.payload.productId,
      productDescription: postData.payload.productDescription,
      quantity:postData.payload.quantity
    });
      refreshPage();
  }catch(e){

  }
}

export function* addProductActions(){
  yield takeEvery(ADD_PRODUCT_ACTION, addProduct);
}
