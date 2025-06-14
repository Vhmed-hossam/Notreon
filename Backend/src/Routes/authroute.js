import express from 'express'
import { Signup,VerifyUser } from '../Controllers/authcontroller.js';

const router = express.Router();

router.post("/signup", Signup)

router.post("/verify", VerifyUser)

export default router