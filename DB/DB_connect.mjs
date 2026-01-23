import mongoose from "mongoose";

const DB =()=>{
    
    try{
        mongoose.connect("mongodb+srv://vijayvasanth994_db_user:Vijay6374@cluster.rvfn25g.mongodb.net/?appName=Cluster")
        .then(()=>console.log("DB connected"))
        .catch((err)=>console.log(`Error,${err}`))

    }

    catch(error){   
        console.log(error)
    }

}

export default DB