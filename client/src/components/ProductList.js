import React,{Component} from 'react';
import Button from './Button.js';

class ProductList extends Component{
    render(){
        return(
            <form> 
                <div>
                    {this.props.name}
                </div>
                <div>
                    {this.props.price}
                </div>
                <div>
                    {this.props.description}
                </div>
            </form>
        )
    }
  }
  
  
  export default ProductList;