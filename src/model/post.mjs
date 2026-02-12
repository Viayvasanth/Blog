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
    }

})

PostSchema.pre('save', function(next) {
    if (this.isModified('title') || !this.slug) {
      this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    next();
  });

export const PostData = mongoose.model('Post',PostSchema);