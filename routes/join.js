//here  we are going to write all joins
import express from 'express';
import db from '../models/index.js';
const {User,Post}=db;

const router=express.Router();

router.get('/innerjoin',async(req,res)=>{
try{
const userswithPost=await User.findAll({
    include:[
        {
            model:Post,
            as:"posts",
            attribute:['id','title','content'],
        }
    ]
})
if(userswithPost)
{
    res.status(200).json(userswithPost) ;
}
}
catch(err)
{
res.status(400).json({error:err.message});
}

})


export default router;
