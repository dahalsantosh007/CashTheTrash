import {LOGINUSERNAME_POST,USERPASSWORD_POST,ISLOADING_POST,STORAGE_POST} from '../actions/types.js';

const initialState= {
  logInUserName:'santosh',
  logInPassword:'S@nt0sh007',
  isLoading:false,
  token:''
}

export default function(state=initialState,action){
  switch (action.type){
    case LOGINUSERNAME_POST:
      return{
        ...state,
        logInUserName: action.payload
      };
    case USERPASSWORD_POST:
      return{
        ...state,
        logInPassword: action.payload
      }
    case ISLOADING_POST:
      return{
        ...state,
        isLoading:action.payload
      }
    case STORAGE_POST:
      return{
        ...state,
        token:action.payload
      }
    default:
      return state;
  }
}
