const mongoose=require('mongoose');
mongoose.pluralize(null);
const PresentSchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        pid:Number,
        pname:String,
        pic:String,
        cid:Number,
        vote:Number

    }
);
module.exports=mongoose.model("presents",PresentSchema);