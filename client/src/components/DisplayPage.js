import React from 'react';
import {getFromStorage,setInStorage} from '../Util/storage';
import Button from './Button.js';
import ButtonPayPal from './ButtonPayPal';
import {Link,Redirect} from 'react-router-dom';
import LogInPage from './LogInPage';
import Top from './Top'
import {connect} from 'react-redux';
import {displayData} from '../sagas/displayPageSaga';
import ProductList from './ProductList'
class DisplayPage extends React.Component{
  componentDidMount(){
    displayData();
  }

  render(){
    const token = getFromStorage('the_main_app');

    const {
      productName,
      productPrice,
      productDescription,
      productId,
      quantity,
      // token,
      data
    } = this.props;

    const post = {
      productName,
      productPrice,
      productDescription,
      productId,
      quantity,
      // token,
    }

      if(!token){
        return(
          <div>
            <Redirect to = "/"/>
          </div>
        )
      } else {

        const dataList = data.map((name,i) =>{
          if(name.quantity !== 0){
            return(
              <div key = {'data_'+i}>
                <ProductList name= {name.productName} price = {name.productPrice} description = {name.productDescription}/>
                <Button name = {name.productName} price = {name.productPrice} description = {name.productDescription}/>
                {/* <ButtonPayPal price = {name.productPrice}/> */}
                <br/><br/><br/>
              </div>
            )
          }
        }
      );
      return(
        <div className = 'displayPage'>
          <div>
            <Top/>
          </div>

          <div>
            {dataList}
          </div>
        </div>
      )
    }
  }
}

const mapStatesToProps = state => ({
  token: state.login.token,
  data: state.displayPage.data,
})

export default connect(mapStatesToProps,{displayData})(DisplayPage);
