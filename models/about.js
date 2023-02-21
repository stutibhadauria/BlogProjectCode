const mongoose=require('mongoose')

const aboutSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const AboutModel=mongoose.model('about',aboutSchema)
module.exports=AboutModel