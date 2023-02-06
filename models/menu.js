const mongoose = require("mongoose")

const MenuSchema=mongoose.Schema({
   title:{
    type: String,
    required:true
   },
   
   price:{
    type: Number,
    required:true
   },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User", //it is an db
    required:true
   },
   
}, {timestamps:true});

module.exports=mongoose.model("menu", MenuSchema);
