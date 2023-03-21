const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user_id:{
        type:String,
        default:null,
    },
    user_name:{
        type:String,
        default:null,
    },
    user_email:{
        type:String,
        unique:true,
    },
    user_pass:{
        type:String,
    }
    
});
module.exports=mongoose.model('User', userSchema)