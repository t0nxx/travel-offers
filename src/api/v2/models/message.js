const mongoose = require('mongoose');
const {Schema} = mongoose;
const {model} = mongoose;

const MessageSchema = new Schema({
    name : {
        type : String ,
        minlength : 3 ,
        maxlength : 255 ,
        required : true
    },
    email : {
        type : String ,
        minlength : 6 ,
        maxlength : 255 ,
        default : "no email"
    },
    phone :{
        type : String ,
        minlength : 6 ,
        maxlength : 30 ,
        default : "no number"
    },
    subject : {
        type : String ,
        required : true ,
        enum :{
            values : ['suggestTrip','requestPrice'],
            message: ' must be requestPrice or suggestTrip'
        } 
    },
    message : {
        type : String ,
        minlength : 3 ,
        maxlength : 300 ,
        required : true
    },
})
const Message = model('Message',MessageSchema);
exports.Message = Message ;