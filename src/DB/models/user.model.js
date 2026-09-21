import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user : {
        type :String,
        require : true
    },
    email : {
        type : String,
        require:true,
        unique:true
    },
    password : {
        type : String,
        require:true
    },
    phone: {
        type: String,
        required: true
    },
    age :{
        type :String,
        min : 18,
        max : 60
    }

});

const userModel = mongoose.model("User",userSchema);

export default userModel;