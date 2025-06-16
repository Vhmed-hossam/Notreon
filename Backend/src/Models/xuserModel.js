import mongoose from "mongoose";

const unknownuserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: "",
    },
    profilePicId: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    verificationCode: {
        type: String,
        default: "",
    },
    identity: {
        type: String,
        default: "",
        unique: true,
    },
})

const UnknownUser = mongoose.models.UnknownUser || mongoose.model("UnknownUser", unknownuserSchema);

export default UnknownUser;
