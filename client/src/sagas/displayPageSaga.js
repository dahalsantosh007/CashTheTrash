import axios from "axios";
import {call, put} from "redux-saga/effects";
import {DATA_POST} from '../actions/types';
import {getFromStorage, setInStorage} from '../Util/storage';

export function *displayData(){

try{
  const obj = getFromStorage('the_main_app');
  console.log(obj)
  const response = yield call (axios.get,'http://localhost:5000/showProduct');
  yield put({
    type: DATA_POST,
    payload: response.data
  });
  const obj2 = setInStorage('the_Product_data',response.data);
//   response.data.data.map((data,index) =>{
//     if (data.quantity === 0) {
//       function *soldProduct(){
//         try{
//           const response = yield call(axios.post, '/soldProductLog',{
//             productName:data.productName,
//             productPrice:data.productPrice,
//             productDescription:data.productDescription,
//             quantity:data.quantity,
//             productId:data.productId,
//           });
//         }catch(e){

//         }
//       }
//     }
//   }
// )
}catch(e){

}
}
