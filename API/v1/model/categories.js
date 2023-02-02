const mongoose=require('mongoose');
mongoose.pluralize(null);
const CategoriesSchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        name:String,
        decs:String,
        cid:Number
    }
);
module.exports=mongoose.model("categories",CategoriesSchema);