import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { deleteUser, getAllUsers, getUser,updateUser } from '../controllers/userController.js';
const router=express.Router();

router.post("/get-user",userAuth,getUser);
router.put("/update-user",updateUser);
router.get("/",getAllUsers);
router.delete("/delete-user",userAuth,deleteUser);
export default router;