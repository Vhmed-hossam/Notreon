import express from "express";
import {
  Signup,
  VerifyUser,
  Login,
  Logout,
  CheckAuth,
  Knewaboutusandhobby,
  EmailToChangePassword,
  ChangePassword,
  CancelChangingpass,
} from "../Controllers/authcontroller.js";
import protection from "../Middleware/protection.js";

const router = express.Router();

router.post("/signup", Signup);

router.post("/verify", VerifyUser);

router.post("/login", Login);

router.post("/logout", Logout);

router.get("/checkauth", protection, CheckAuth);

router.post("/knewaboutusandhobby", protection, Knewaboutusandhobby);

router.post("/changepassreq", protection, EmailToChangePassword);

router.post("/changepassword", protection, ChangePassword);

router.post("/canceloperation", protection, CancelChangingpass);

export default router;
