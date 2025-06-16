import { ErrorMessages } from "../Messages/Errs/Errormsgs";
import User from "../Models/userModel";
import { SuccessMessages } from "../Messages/Sucs/Succesmsgs";

export async function ChangeName(req, res) {
    const { newName } = req.body;
    const userId = req.user._id;
    try {
      if (!newName.trim()) {
        return res.status(400).json({ error: ErrorMessages.requirednewname });
      }
      if (!userId) {
        return res.status(400).json({ error: ErrorMessages.requID });
      }
      if (newName.length < 3) {
        return res.status(400).json({ error: ErrorMessages.tooShortname });
      }
      if (newName.length >= 30) {
        return res.status(400).json({ error: ErrorMessages.tooLongname });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: ErrorMessages.userNotFound });
      }
      const updatedUser = await user.findbyAndUpdate(userId, { name: newName }, { new: true })
      return res.status(200).json({ message: SuccessMessages.nameChanged, updatedUser });
    } catch (error) {
      console.error("ChangeName error:", error);
      return res.status(500).json({ error: ErrorMessages.ISerror });
    }
  }