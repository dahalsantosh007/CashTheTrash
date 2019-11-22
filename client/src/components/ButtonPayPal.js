import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

class ButtonPayPal extends React.Component{

  render() {
    return (
      <div>
        <PayPalButton
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
      />
      </div>
    )
  }
}

export default ButtonPayPal;
