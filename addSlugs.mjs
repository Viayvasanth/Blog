import mongoose from 'mongoose'
import { PostData } from './src/model/post.mjs';
import DB from './DB/DB_connect.mjs'

async function addSlugs() {
  await DB();
  
  try {
    const posts = await PostData.find({});
    
    for (let post of posts) {
      if (!post.slug) {
        post.slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        await post.save();
      }
    }

    console.log('Slugs added successfully');
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  process.exit();
}

addSlugs();