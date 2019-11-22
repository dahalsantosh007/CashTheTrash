import {PRODUCT_NAME,PRODUCT_PRICE,PRODUCT_DESCRIPTION,PRODUCT_ID,QUANTITY,DATA_POST} from '../actions/types';

const initialState = {
  productName:[],
  productPrice:[],
  productDescription:[],
  productId:[],
  quantity:[],
  data:[]
}

export default function(state = initialState,action){
  switch(action.type){
    case PRODUCT_NAME:
      return{
        ...state,
        productName:action.payload
      };

    case PRODUCT_PRICE:
      return{
        ...state,
        productPrice:action.payload
      };

    case PRODUCT_DESCRIPTION:
      return{
        ...state,
        productDescription:action.payload
      };

    case PRODUCT_ID:
      return{
        ...state,
        productId:action.payload
      };

    case QUANTITY:
      return{
        ...state,
        quantity:action.payload
      };

    case DATA_POST:
      return{
        ...state,
        data:action.payload
      };

    default:
      return state;
  }
}
