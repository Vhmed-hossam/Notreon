import express from 'express'
import { ChangeProfilePic, ChangeName } from "../Controllers/customizecontroller.js"
import protection from '../Middleware/protection.js';

const router = express.Router();

router.post("/changename", protection, ChangeName)

router.post("/changeprofilepic", protection, ChangeProfilePic)

export default router
