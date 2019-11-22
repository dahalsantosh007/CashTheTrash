import {REGISTER_EMAIL,REGISTER_PASSWORD,REGISTER_USER_NAME,REGISTER_CONFIRM_PASSWORD} from '../actions/types';

const initialState = {
  registerUserName:'',
  registerEmail:'',
  registerPassword:'',
  registerConfirmPassword:''
}

export default function(state = initialState,action){
  switch(action.type){
    case REGISTER_USER_NAME:
      return{
        ...state,
        registerUserName: action.payload
      }
    case REGISTER_PASSWORD:
      return{
        ...state,
        registerPassword: action.payload
      }
    case REGISTER_CONFIRM_PASSWORD:
      return{
        ...state,
        registerConfirmPassword: action.payload
      }
    case REGISTER_EMAIL:
      return{
        ...state,
        registerEmail: action.payload
      }
    default:
      return state;
  }
}
