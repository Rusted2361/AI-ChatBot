import { randomUUID } from "crypto";
import mongoose from "mongoose";
const ChatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [ChatSchema]
});
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=User.js.map