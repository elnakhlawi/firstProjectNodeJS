const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const PostSchema=new Schema({
  name:String,
  title:String,
  content:String,
  date:Number
})


const Posts=mongoose.model('Post',PostSchema);


module.exports=Posts;