import {LOGGED_USER} from '../actions/types';

const initialState = {
  loggedUserName : []
};

export default function(state = initialState,action){
  switch(action.type){
    case LOGGED_USER:
      return{
        ...state,
        loggedUserName: action.payload
      }
    default:
      return state;
  }
}
