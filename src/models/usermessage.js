const  mongoose = require("mongoose");
const { type } = require("os");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5
    },
    email:{
        type: String,
        required: [true,"Please provide your email"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address")
            }
        }
        
    },
    phone:{
        type:Number,
        required:true,
        validate(value){
           if (value.length !=10 ) {
               throw new Error('Phone number must be 10 digits')
           }
    }
    },
    message:{
        type:String,
        required:true,
        minLength:5
    }

})

//we need a collection
const User = mongoose.model("User",userSchema);
module.exports = User;