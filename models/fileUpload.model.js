const mongoose=require("mongoose")

const fileSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
mimetype:{
    type:String,
    required:true,
},
size:{
    type:String,
    required:true,
}
})

// store in file
const file =new mongoose.model("file",fileSchema);

module.exports=file;