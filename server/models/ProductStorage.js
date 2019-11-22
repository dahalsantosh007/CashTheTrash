var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var newProductSchema = new Schema({
  productName : {
    type : String,
    require : true,
    default: '',
  },

    productPrice :{
      type: String,
      require: true,
    },

    productDescription : {
      type: String,
      require: true
    },

    productId : {
      type: String,
      require: true
    },

    isBought : {
      type: Boolean,
      default: false
    },

    isRemoved : {
      type: Boolean,
      default: false
    },

    quantity:{
      type: Number,
      default:''
    }
});

const NewProduct = mongoose.model('NewProductSchema', newProductSchema,'newProduct');

module.exports = NewProduct;
