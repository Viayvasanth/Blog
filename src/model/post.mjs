import mongoose, { model } from 'mongoose'

const exampleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
}, { _id: false });

const PostSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },

    content:{
        type:String,
        required:true,
    },

    excerpt:{
        type:String,
        required:true,
    },

    category:{
        type:String,
        required:true, 
    },

    author:{
        type:String,
        required:true,
    },

    image:{
        type:String,
    },

    examples:[exampleSchema],

    createdAt:{
        type:Date,
        default:Date.now,
    },

    updatedAt:{
        type:Date,
        default:Date.now,
    }

})

export const PostData = mongoose.model('Post',PostSchema);