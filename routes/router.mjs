import {Router} from 'express'
import PostRouter from './postroute.mjs';


const router = Router();

router.use(PostRouter)


export default router;
