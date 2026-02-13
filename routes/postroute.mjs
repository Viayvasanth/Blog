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

  //pagination

  const page = Math.max(1, parseInt(req.query.page) || 1); // default page 1, min 1
  const limit = Math.min(10, parseInt(req.query.limit) || 3); // cap at 100
  const skip = (page - 1) * limit;

    try{
        const getblog=await PostData.find()
        .skip(skip)
        .limit(limit);

        const total = await PostData.countDocuments();

        if(total === 0){
          return  res.status(404).send({message:"No blogs found"})
        }

        const totalPages = Math.ceil(total / limit);
        if (page > totalPages) {
          return res.status(404).send({ message: "Page not found" });
        }

         res.status(200).send(
          {data: getblog,
            pagination: {
            currentPage: page,
            pageSize: limit,
            totalRecords: total,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit)
          }});
    }
    catch(error){
         res.status(500).send({ message: "server error" });
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
