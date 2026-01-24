import express from 'express'
import DB from './DB/DB_connect.mjs'
import routes from './routes/router.mjs'
import cors from 'cors'
import dotenv from 'dotenv'

// import PostData from './src/model/post.mjs'

dotenv.config();
const app = express()




//middleware
app.use(express.json());
app.use(cors());

// Serve images publicly
app.use("/uploads", express.static("uploads"));

//datababe connect
DB()

//use routes
app.use(routes);


// app listening 
const port = process.env.PORT;

app.listen(port,()=>{
   console.log( `server is listening on ${port}`);
})