var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var soldProductSchema = mongoose.Schema({
  productName : {
    type : String,
    require : true,
    default: 'Unknown',
  },

    productPrice :{
      type: String,
      require: true,
    },

    productDescription : {
      type: String,
      require: true
    },

    isBought : {
      type: Boolean,
      default: true
    },

    isRemoved : {
      type: Boolean,
      default: true
    },

    quantity:{
      type: Number,
      default:0
    },

    productId : {
      type: String,
      require: true
    }

});

module.exports.addSoldProductLog = function (soldProductInfo) {
    SoldProduct.create(soldProductInfo);
};

var SoldProduct = mongoose.exports = mongoose.model('SoldProduct',soldProductSchema);
