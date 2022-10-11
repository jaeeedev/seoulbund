const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 50,
  },
  id: {
    type: String,
    trim: true, //빈칸 조지기
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 80,
  },
  token: String,
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, "secretToken", { expiresIn: "7d" });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
