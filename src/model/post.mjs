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


const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PostSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    slug: { type: String, unique: true, sparse: true, index: true },

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
    },
    comments : [CommentSchema]

})



PostSchema.pre('save', function(next) {
  try {
    if (this.isModified('title') || !this.slug) {
      this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
  } catch (error) {
    next(error);
  }
});

export const PostData = mongoose.model('Post',PostSchema);
 