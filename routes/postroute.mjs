import {Router} from 'express'
import { PostData } from '../src/model/post.mjs';
import multer from "multer";


// Create uploads folder manually in backend root
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });



const router = Router()


//Get All post

router.get('/api/blogs',async(req,res)=>{

    try{
        const getblog=await PostData.find();
         res.send(getblog);
    }
    catch(error){
         res.status(404).send({ message: "Invalid data" });
    }

})

//get id

router.get('/api/blogs/:slug',async(req,res)=>{

    // const {slug} = req.params.slug;
    //   // console.log(slug)
    try{
        const getidblog=await PostData.findOne({slug :req.params.slug });

        if(!getidblog){
          return  res.status(404).send({message:"Post not found"})
        }

        return res.status(200).send(getidblog);
    }

    catch(error){
        res.status(400).send({message:error.message})
    }
})

//post 

router.post('/api/blogs', upload.single("image"), async (req, res) => {
    try {
      const postblog = new PostData({
        ...req.body,
        slug: generateSlug(req.body.title),
        image: req.file.filename   // store only filename
      });
  
      const savedblog = await postblog.save();
      return res.status(201).send(savedblog);
  
    } catch (error) {
      return res.status(400).send({ msg: error.message });
    }
  });
  

//put

router.put('/api/blogs/:id',async(req,res)=>{

        const ID = req.params.id;

        try{
            const putidblog=await PostData.findByIdAndUpdate(
            { _id: ID },
            { $set: req.body },
            { new: true }
            );
    
            if(!putidblog){
              return  res.status(404).send({message:"Post not found"})
            }

            return res.status(200).send(putidblog);
        }
        catch(error){
            return res.status(400).send({msg:error.message})
        
        }
})

//Delete

router.delete('/api/blogs/:id',async(req,res)=>{

    const ID =req.params.id;

    try{
        const deleteidblog=await PostData.findByIdAndDelete(ID);

        if(!deleteidblog){
          return  res.status(404).send({message:"Post data not found"})
        }

        return res.status(200).send(deleteidblog);
    }

    catch(error){
        res.status(400).send({message:error.message})
    }
})

export default router
