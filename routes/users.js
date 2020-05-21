const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
// const passport = require('passport');

var jwthelper = (req, res, next) => {
  console.log("jwt helper .....");
  const token = req.headers.authorization;
  //  req.body.token || req.query.token || req.headers['x-access-token']
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        console.log(err);

        return res
          .status(401)
          .json({ error: true, message: "unauthorized_access" });
      } else {
        console.log(decoded);
        req.id = decoded.user._id;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: "no_token_provided.",
    });
  }
};

router.post("/register", function (req, res) {
  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  User.saveUser(newUser, function (err, user) {
    if (err) {
      res.json({ state: false, msg: "data not inserted" });
    }
    if (user) {
      res.json({ state: true, msg: "data inserted successullyf" });
    }
  });
});

router.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);

  User.findByEmail(email, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ state: false, msg: "user not found" });
      return false;
    }
    User.passwordCheck(password, user.password, function (err, match) {
      if (err) throw err;

      if (match) {
        const token = jwt.sign({ user }, config.secret, {
          expiresIn: 86400 * 3,
        });
        res.json({
          state: true,
          token: token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        res.json({ state: false, msg: "password does not match" });
      }
    });
  });
});

// router.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res){
//   res.json({user:req.user});
// }

router.post("/profile", jwthelper, (req, res) => {
  console.log("authenticated " + req.id);

  res.json({ userid: req.id });
});

// function verifyToken(req,res,next){

//   if(typeof(req.headers['authorization']) != 'undefined' && req.headers['authorization'] != 'undefined'){
//     var headerToken = req.headers['authorization'].split('')[1];
//     if(headerToken !== 'undefined'){
//       req.token = headerToken;
//       next();

//     }else{
//       res.json({msg:"Unauthorized Request"})
//     }
//   }else{
//     res.json({msg:"Unauthorized,Token does not have header"})
//   }

// }
module.exports = router;
