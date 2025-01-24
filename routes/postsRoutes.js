import express from 'express';
import db from '../models/index.js';

const router=express.Router();
const {Post}=db;

//create post 
router.post("/posts",async(req,res)=>{
try{
     const {title,content,userId}=req.body;
     const post= await Post.create({title,content,userId});
     res.status(201).json(post);
}
catch(err)
{
    res.status(400).json({error:err.message});
}
});


//get all posts
router.get("/posts",async(req,res)=>{
    try{
         
         const posts= await Post.findAll();
         if(posts)
         {res.status(201).json(posts);}
         else{
            res.status(201).json({error:"not found"});
         }
    }
    catch(err)
    {
        res.status(400).json({error:err.message});
    }
    });




export default router;