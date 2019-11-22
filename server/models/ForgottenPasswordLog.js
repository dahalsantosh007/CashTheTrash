var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var codeLogSchema = mongoose.Schema({
  token: {
    type: String,
    require: true,
    default:''
  },

  dateLog:{
    type: Date,
    require: true,
  },

  isUsed:{
    type: Boolean,
    default: false
  },

  email:{
    type: String,
    require: true,
    default: ''
  },

  userName:{
    type: String,
    require: true,
    default: ''
  }
});

module.exports.addCodeLog = function(codeLogInfo){
  CodeLog.create(codeLogInfo);
};

var CodeLog = mongoose.exports = mongoose.model('CodeLog',codeLogSchema);
