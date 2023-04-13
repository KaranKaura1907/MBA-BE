const mongoose=require('mongoose');
const theatreSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    },
    movies:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Movie"
    },
    ownerId:{
        type: mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"User"
    }
    //versionKey: false // this will remove the __v field,which indicates the internal revision of the document    
})  
module.exports= mongoose.model("Theatre",theatreSchema);