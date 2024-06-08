import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { getAllUsers, getUser,updateUser } from '../controllers/userController.js';
const router=express.Router();

router.post("/get-user",userAuth,getUser);
router.put("/update-user",updateUser);
router.get("/",getAllUsers);

router.get("/",getAllUsers);
export default router;