import {ENTERED_EMAIL,ENTERED_TOKEN,ENTERED_NEW_PASSWORD,ENTERED_USER_NAME} from '../actions/types'

const initialState = {
  enteredEmail:[],
  enteredToken:[],
  enteredNewPassword:[],
  enteredUserName:[]
}

export default function (state = initialState,action){
  switch(action.type){
    case ENTERED_EMAIL:
      return{
        ...state,
        enteredEmail: action.payload
      }
    case ENTERED_TOKEN:
      return{
        ...state,
        enteredToken: action.payload
      }
    case ENTERED_NEW_PASSWORD:
      return{
        ...state,
        enteredNewPassword: action.payload
      }
    case ENTERED_USER_NAME:
      return{
        ...state,
        enteredUserName: action.payload
      }
    default:
     return state;
  }
}
