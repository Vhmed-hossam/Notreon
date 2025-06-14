import imageKit from "../Lib/imageKit.js";
import { ErrorMessages } from "../Messages/Errs/Errormsgs.js";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import UnknownUser from "../Models/xuserModel.js";
import GenerateCode from "../Tasks/GenerateCode.js";
import SendCodeEmail from "../Tasks/SendEmail.js";
import { v4 as uuidv4 } from "uuid";
import { SuccessMessages } from "../Messages/Sucs/Succesmsgs.js";
import diffDates from "diff-dates";
export async function Signup(req, res) {
  const { name, email, password, profilePic } = req.body;
  try {
    const user = await User.findOne({ email })
    const unknownuser = await UnknownUser.findOne({ email })
    if (user) {
      return res.status(400).json({ error: ErrorMessages.userAlreadyExists });
    }
    if (unknownuser) {
      return res.status(400).json({ error: ErrorMessages.userAlreadyExistsandUnknown });
    }
    if (!email.trim() || !password.trim() || !name.trim()) {
      return res.status(400).json({ error: ErrorMessages.cannotcreateuser });
    }
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password.trim())) {
      return res.status(400).json({ error: ErrorMessages.invalidPassword });
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      return res.status(400).json({ error: ErrorMessages.invalidEmail });
    }
    let identity = uuidv4();
    const searchuuid = await UnknownUser.findOne({ identity });
    if (searchuuid) {
      identity = uuidv4();
    }
    const salt = await bcrypt.genSalt(10);
    const decryptedpassword = await bcrypt.hash(password, salt);
    let profilePicture = "";
    if (profilePic) {
      const image = await imageKit.upload({
        file: profilePic,
        fileName: "picture",
      });
      profilePicture = image.url;
    }
    const code = GenerateCode();
    await SendCodeEmail(name, email, code, identity, "Thank you for joining us — we're excited to have you on board , we offer a smooth, clutter-free, and relaxing experience, helping you focus on what truly matters: your notes. please verify yourself by copying this code and the identity below : ");
    const newUser = new UnknownUser({
      name,
      email,
      password: decryptedpassword,
      profilePic: profilePicture,
      createdAt: Date.now(),
      verificationCode: code,
      identity
    });

    await newUser.save();

    res.status(201).json({ message: SuccessMessages.userCreated, user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function VerifyUser(req, res) {
  const { code, identity } = req.body;
  try {
    const unknownuser = await UnknownUser.findOne({ identity });
    if (!unknownuser) {
      return res.status(404).json({ error: ErrorMessages.userNotFound });
    }
    if (code !== unknownuser.verificationCode) {
      return res.status(400).json({ error: ErrorMessages.invalidCode });
    }
    const diff = diffDates(Date.now(), unknownuser.createdAt, "seconds");
    if (diff > 2) {
      await UnknownUser.deleteOne({ identity });
      return res.status(400).json({ error: ErrorMessages.permenantdel });
    }
    const user = new User({
      name: unknownuser.name,
      email: unknownuser.email,
      password: unknownuser.password,
      profilePic: unknownuser.profilePic,
      createdAt: unknownuser.createdAt,
    });
    await user.save();
    await UnknownUser.deleteOne({ identity });
    res.status(200).json({ message: SuccessMessages.userVerified, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ErrorMessages.ISerror });
  }
}