const mongoose=require('mongoose');
mongoose.pluralize(null);
const WorkersSchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        name:String,
        email:String,
        address:String,
        city:String,
        wid:Number,
        voted:Number,
        
    }
);
module.exports=mongoose.model("workers",WorkersSchema);