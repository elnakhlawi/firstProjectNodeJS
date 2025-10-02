const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const videosSchema=new Schema({
  name:String,
  title:String,
  size:Number
})



const Videos=mongoose.model('Video',videosSchema);

module.exports=Videos;