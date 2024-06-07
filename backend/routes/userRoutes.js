import express from 'express';
import User from '../models/userSchema';
const router=express.Router();


router.get('/',async(req,res)=>{
    const users=await User.find();
    res.json(users);
})
router.post('/', async (req, res) => {
  
    res.json(savedUser);
});

