import express from 'express'
import { Signup, VerifyUser, Login, Logout, CheckAuth } from '../Controllers/authcontroller.js';
import protection from '../Middleware/protection.js';

const router = express.Router();

router.post("/signup", Signup)

router.post("/verify", VerifyUser)

router.post("/login", Login)

router.post("/logout", Logout)

router.post("/checkauth", protection, CheckAuth)

export default router