var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newUserSchema = new Schema({
    userName: {
        type: String,
        require: true,
        index: { unique: true }
    },

    password: {
      type: String, 
      require: true
    },

    email:{
        type: String,
        require: true
    },

    isDeleted:{
      type: Boolean,
      default: false,
    }
});
const NewUser = mongoose.model('NewUser', newUserSchema,'newUser');

module.exports = NewUser;