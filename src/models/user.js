import { Schema, model } from "mongoose";
import bCrypt from "bcryptjs";

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.checkPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

export default User;
