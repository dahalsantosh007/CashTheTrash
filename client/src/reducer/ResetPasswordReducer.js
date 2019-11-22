import {ENTERED_EMAIL,ENTERED_USER_NAME,TOKEN_RECEIVED} from '../actions/types';

const initialState = {
  enteredEmail:[],
  enteredUserName: [],
  tokenReceived:''
}

export default function(state = initialState, action){
  switch(action.type){
    case ENTERED_EMAIL:
      return{
        ...state,
        enteredEmail: action.payload
      }
    case ENTERED_USER_NAME:
      return{
        ...state,
        enteredUserName: action.payload
      }
    case TOKEN_RECEIVED:
      return{
        ...state,
        tokenReceived: action.payload
      }
    default:
      return state;
  }
}
