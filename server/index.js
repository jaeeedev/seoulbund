const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://test:testman77@cluster0.crkqjoj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongoDB connected!");
  })
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  return res.send("Hello, world!");
});

app.post("/api/users/register", (req, res) => {
  // User.findOne({ id: req.body.id }, (err, user) => {
  //   if (user) {
  //     return res.json({
  //       existedId: true,
  //     });
  //   }
  // });

  bcrypt.hash(req.body.password, 10, function (err, hash) {
    const user = new User({
      id: req.body.id,
      username: req.body.username,
      password: hash,
    });

    user.save((err) => {
      if (err) return res.status(500).json({ success: false, err });

      return res.status(200).json({
        success: true,
      });
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "아이디가 존재하지 않습니다.",
      });
    }

    const result = user.checkPassword(req.body.password);

    if (result == false) {
      return res.status(401).json({
        loginSuccess: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    const token = user.generateToken();

    return res.cookie("cookie_token", token).status(200).json({
      loginSuccess: true,
      userId: user._id,
    });
  });
});

app.get("/api/users/logout", (req, res) => {
  const token = req.cookies.cookie_token;

  if (!token) {
    console.log("no token");
  }

  const decoded = jwt.verify(token, "secretToken");

  User.findOne(
    {
      _id: decoded,
    },
    function (err, user) {
      if (err) return res.json({ logoutSuccess: false, err });

      res.cookie("cookie_token"); //토큰 비워주기

      return res.status(200).json({
        logoutSuccess: true,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`server starts at ${port}`);
});
