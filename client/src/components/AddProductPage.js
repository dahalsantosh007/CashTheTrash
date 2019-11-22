import React from 'react';
import {Button} from './Button.js';
import {Link,Redirect} from 'react-router-dom';
import LogInPage from './LogInPage';
import Top from './Top'
import {connect} from 'react-redux';
import {addProductDetailAction} from '../actions/displayPageAction';
import {bindActionCreators} from 'redux';
import {addProductActions} from '../actions/types';

class AddProductPage extends React.Component{
  render(){
    const {
      productName,
      productPrice,
      productDescription,
      productId,
      quantity,
      token,
      data
    } = this.props;

    const post = {
      productName,
      productPrice,
      productDescription,
      productId,
      quantity,
      token,
    }

    if(!token){
      return(
        <Redirect to = '/'/>
      )
    }else{
      return(
        <div className = 'displayPage'>
          <div>
            <Top/>
          </div>
          <div>
            <p>Add product</p>
            <input
              type = "text"
              placeholder = "Product Name"
              value = {productName}
              onChange = {(event)=>this.props.addProductDetailAction(event.target.value,'PRODUCT_NAME')}
            />

            <input
            type = "text"
            placeholder = "Product Price"
            value = {productPrice}
            onChange = {(event)=>this.props.addProductDetailAction(event.target.value,'PRODUCT_PRICE')}
            />

            <input
            type = "text"
            placeholder = "Product Description"
            value = {productDescription}
            onChange = {(event)=>this.props.addProductDetailAction(event.target.value,'PRODUCT_DESCRIPTION')}
            />

            <input
            type = "text"
            placeholder = "Product Id"
            value = {productId}
            onChange={(event)=>this.props.addProductDetailAction(event.target.value,'PRODUCT_ID')}
            />

            <input
            type = "text"
            placeholder = "Quantity"
            value = {quantity}
            onChange={(event)=>this.props.addProductDetailAction(event.target.value,'QUANTITY')}
            />

          </div>

          <div>
            <button onClick = {()=>this.props.addProductActions(post)}>
              Add Product
            </button>
          </div>
        </div>
      )
    }
  }
}

const mapStatesToProps = state => ({
  productName: state.displayPage.productName,
  productPrice: state.displayPage.productPrice,
  productDescription: state.displayPage.productDescription,
  productId: state.displayPage.productId,
  quantity: state.displayPage.quantity,
  token: state.login.token,
  data: state.displayPage.data,
})

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      addProductDetailAction,addProductActions
    }, dispatch)
  }
}

export default connect(mapStatesToProps,mapDispatchToProps)(AddProductPage);
