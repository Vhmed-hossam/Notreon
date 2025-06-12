import jwt from "jsonwebtoken";
import { ErrorMessages } from "../Messages/Errs/Errormsgs";
import User from "../Models/userModel";

export default async function protection(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: ErrorMessages.noToken });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      res.clearCookie("token");
      return res.status(401).json({ error: ErrorMessages.invalidToken });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.clearCookie("token");
      return res.status(401).json({ error: ErrorMessages.userNotFound });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ErrorMessages.ISerror });
  }
}
