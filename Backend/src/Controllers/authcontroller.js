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
import { generateToken } from "../Lib/GenerateToken.js";
import { LongText } from "../Messages/Long/text.js";
import { validAboutUsOptions, validHobbyOptions } from "../Lib/Options.js";

export async function Signup(req, res) {
  const { name, email, password, profilePic } = req.body;
  try {
    const user = await User.findOne({ email });
    const unknownuser = await UnknownUser.findOne({ email });
    if (user) {
      return res.status(400).json({ error: ErrorMessages.userAlreadyExists });
    }
    if (unknownuser) {
      return res
        .status(400)
        .json({ error: ErrorMessages.userAlreadyExistsandUnknown });
    }
    if (!email.trim() || !password.trim() || !name.trim()) {
      return res.status(400).json({ error: ErrorMessages.cannotcreateuser });
    }
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password.trim()
      )
    ) {
      return res.status(400).json({ error: ErrorMessages.invalidPassword });
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
    ) {
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
    let profilePictureId = "";
    if (profilePic) {
      const image = await imageKit.upload({
        file: profilePic,
        fileName: `${name}_profilepic`,
      });
      profilePicture = image.url;
      profilePictureId = image.fileId;
    }
    const code = GenerateCode();
    await SendCodeEmail(
      name,
      email,
      code,
      identity,
      LongText.emailVerificationMessage
    );
    const newUser = new UnknownUser({
      name,
      email,
      password: decryptedpassword,
      profilePic: profilePicture,
      createdAt: Date.now(),
      verificationCode: code,
      identity,
      profilePicId: profilePictureId,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: SuccessMessages.userCreated, user: newUser });
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
    const diff = diffDates(Date.now(), unknownuser.createdAt, "days");
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
      profilePicId: unknownuser.profilePicId,
    });
    await user.save();
    await UnknownUser.deleteOne({ identity });
    res.status(200).json({ message: SuccessMessages.userVerified, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function Login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: ErrorMessages.invalidLogin });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.incorrectEorP });
    }
    const unkUser = await UnknownUser.findOne({ email });
    if (unkUser) {
      return res.status(400).json({ error: ErrorMessages.userIsntVerified });
    }
    const PassCheck = await bcrypt.compare(password, user.password);
    if (!PassCheck) {
      return res.status(400).json({ error: ErrorMessages.incorrectEorP });
    }
    const token = generateToken(user._id, res);
    await user.save();
    res
      .status(200)
      .json({ message: SuccessMessages.userLoggedIn, user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function Logout(req, res) {
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({ error: ErrorMessages.requID });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.userNotFound });
    }
    res.clearCookie("token");
    res
      .status(200)
      .json({ message: SuccessMessages.userLoggedOut, token: null });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function CheckAuth(req, res) {
  try {
    return res.status(200).json({
      message: SuccessMessages.userAuthenticated,
      user: req.user,
    });
  } catch (error) {
    console.error("CheckAuth error:", error);
    res.clearCookie("token");
    return res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function Knewaboutusandhobby(req, res) {
  const { aboutus, hobby } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.userNotFound });
    }
    if (!validAboutUsOptions.includes(aboutus)) {
      return res.status(400).json({ error: ErrorMessages.invalidAboutUs });
    }
    if (!validHobbyOptions.includes(hobby)) {
      return res.status(400).json({ error: ErrorMessages.invalidHobby });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        knewaboutusby: aboutus,
        myhobby: hobby,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: SuccessMessages.userAuthenticated, updatedUser });
  } catch (error) {
    console.error("knewaboutusandhobby error:", error);
    return res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function EmailToChangePassword(req, res) {
  const { email } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.userNotFound });
    }
    if (user.verificationCode) {
      return res
        .status(400)
        .json({ error: ErrorMessages.changingpassalreadypending });
    }
    const code = GenerateCode();
    const identity = uuidv4();
    const salt = await bcrypt.genSalt(5);
    const decryptedCode = await bcrypt.hash(String(code), salt);
    await SendCodeEmail(
      user.name,
      user.email,
      code,
      identity,
      LongText.changepasswordreq
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        verificationCode: decryptedCode,
        verificationIdentity: identity,
        codeDate: Date.now(),
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: SuccessMessages.changepasswordreqsent, updatedUser });
  } catch (error) {
    console.error("EmailToChangePassword error:", error);
    return res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function ChangePassword(req, res) {
  const { code, identity, newPassword } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findOne({ verificationIdentity: identity });
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.userNotFound });
    }
    const isValidCode = await bcrypt.compare(
      String(code),
      user.verificationCode
    );
    if (!isValidCode) {
      return res.status(400).json({ error: ErrorMessages.invalidCode });
    }
    const diff = diffDates(Date.now(), user.codeDate, "minutes");
    if (diff > 15) {
      const code = GenerateCode();
      const salt = await bcrypt.genSalt(5);
      const decryptedCode = await bcrypt.hash(String(code), salt);
      const newIdentity = uuidv4();
      await SendCodeEmail(
        user.name,
        user.email,
        code,
        newIdentity,
        LongText.changepasswordreq
      );
      await User.findByIdAndUpdate(
        userId,
        {
          verificationCode: decryptedCode,
          verificationIdentity: newIdentity,
          codeDate: Date.now(),
        },
        { new: true }
      );
      return res.status(400).json({ error: ErrorMessages.codeexpired });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        verificationCode: "",
        verificationIdentity: "",
        codeDate: "",
      },
      { new: true }
    );
    if (!newPassword.trim()) {
      return res.status(400).json({ error: ErrorMessages.cannotcreateuser });
    }
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        newPassword.trim()
      )
    ) {
      return res.status(400).json({ error: ErrorMessages.invalidPassword });
    }
    const isSamePassword = await bcrypt.compare(
      newPassword.trim(),
      user.password
    );
    if (isSamePassword) {
      return res.status(400).json({ error: ErrorMessages.passwordAlreadyUsed });
    }
    const salt = await bcrypt.genSalt(5);
    const decryptedpassword = await bcrypt.hash(newPassword.trim(), salt);
    await User.findByIdAndUpdate(
      userId,
      { password: decryptedpassword },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: SuccessMessages.paasswordchanged, updatedUser });
  } catch (error) {
    console.error("ChangePassword error:", error);
    return res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function CancelChangingpass(req, res) {
  const userId = req.user._id;
  const { identity } = req.body;
  try {
    if (!identity) {
      return res.status(400).json({ error: ErrorMessages.reqIdentity });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.userNotFound });
    }
    if (!user.verificationCode) {
      return res
        .status(400)
        .json({ error: ErrorMessages.nochangingpasspending });
    }
    if (user.verificationIdentity !== identity) {
      return res.status(400).json({ error: ErrorMessages.invalidIdentity });
    }
    await User.findByIdAndUpdate(
      userId,
      { verificationCode: "", verificationIdentity: "", codeDate: "" },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: SuccessMessages.changepasswordreqcancelled });
  } catch (error) {
    console.error("CancelChangingpass error:", error);
    return res.status(500).json({ error: ErrorMessages.ISerror });
  }
}
