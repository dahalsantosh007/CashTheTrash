import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { PayPalButton } from "react-paypal-button-v2";

class Button extends React.Component{
  // onBuyPayPal(){
  //   fetch('http://localhost:5000/buyTheProduct/paypal',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json',
  //     },
  //     body: JSON.stringify({
  //       name:this.props.name,
  //       price:this.props.price,
  //       description:this.props.description
  //     })
  //   }).then(res => res.json())
  //   .then(json =>{
  //     console.log(json);
  //   });
  // }

  onBuyStripe = (token) => {
    fetch('http://localhost:5000/buyTheProduct/stripe', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        token:token.id,
        amount: this.props.price*100,
        description:this.props.description,
      }),
    }).then(res => res.json()).then(json =>{
      if(json.message === 'error'){
        console.log('error');
      }else{
        console.log('success');
      }
    });
  }

  render() {
    return (
      <div>
        <div>
        {/* <PayPalButton
        amount= {this.props.price}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
 
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderId: data.name
            })
          });
        }}
        options={{
          clientId: "Aa4QKD65L7iujfcDDEYlPeZUJo_yLtkTokCdz2O3Fz965Zlu33BZ0oUFk7eB6UCuPKuwmWfhKlpRniOl"
        }}
      /> */}

          <StripeCheckout
            token={()=>this.onBuyStripe()}
            stripeKey="pk_test_3l7PmxFLeiz2BdT8EvQ5ROKy"/>
        </div>
      </div>
    )
  }
}

export default Button;
