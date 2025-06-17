import { ErrorMessages } from "../Messages/Errs/Errormsgs.js";
import User from "../Models/userModel.js";
import { SuccessMessages } from "../Messages/Sucs/Succesmsgs.js";
import imageKit from "../Lib/imageKit.js";

export async function ChangeName(req, res) {
  const { newName } = req.body;
  const UserId = req.user._id;
  try {
    if (!newName.trim()) {
      return res.status(400).json({ error: ErrorMessages.requirednewname });
    }
    if (newName.length < 3) {
      return res.status(400).json({ error: ErrorMessages.tooShortname });
    }
    if (newName.length >= 30) {
      return res.status(400).json({ error: ErrorMessages.tooLongname });
    }
    const user = await User.findById(UserId).select("name");
    if (user.name === newName) {
      return res.status(400).json({ error: ErrorMessages.nameAlreadyused });
    }
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.userNotFound });
    }
    const updatedUser = await User.findByIdAndUpdate(
      UserId,
      { name: newName },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: SuccessMessages.nameChanged, updatedUser });
  } catch (error) {
    console.error("ChangeName error:", error);
    return res.status(500).json({ error: ErrorMessages.ISerror });
  }
}

export async function ChangeProfilePic(req, res) {
  const { newProfilepic } = req.body;
  const MUserId = req.user._id;
  try {
    if (!newProfilepic.trim()) {
      return res
        .status(400)
        .json({ error: ErrorMessages.requirednewprofilepic });
    }
    const user = await User.findById(MUserId);
    if (!user) {
      return res.status(404).json({ error: ErrorMessages.userNotFound });
    }
    await imageKit.deleteFile(user.profilePicId);
    const newImage = await imageKit.upload({
      file: newProfilepic,
      fileName: `${user.name}_profilepic`,
    });
    const updatedUser = await User.findByIdAndUpdate(
      MUserId,
      { profilePic: newImage.url, profilePicId: newImage.fileId },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: SuccessMessages.nameChanged, updatedUser });
  } catch (error) {
    console.error("ChangeAvatar error:", error);
    return res.status(500).json({ error: ErrorMessages.ISerror });
  }
}
