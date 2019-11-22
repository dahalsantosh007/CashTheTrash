var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSessionSchema = new Schema({
    _id: {
        type: String,
        default: "",
        require: true
    },

    userName:{
        type: String,
        default:"",
        require: true
    },

    timestamp: {
      type: Date,
      require: true,
      default: Date.now()
    },

    isLoggedOut:{
      type: Boolean,
      default: false,
    },
    
});

const LoggedUser = mongoose.model('LoggedUser', userSessionSchema,'loggerUser');

module.exports = LoggedUser;
