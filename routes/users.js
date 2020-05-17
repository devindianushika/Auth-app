const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// const passport = require('passport');

router.post("/register", function (req, res) {
  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password

  });



  User.saveUser(newUser, function (err, user) {
    if (err) {
      res.json({ state: false, msg: "data not inserted" });
    }
    if(user){
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
        const token = jwt.sign({user},config.secret,{expiresIn:86400*3});
        res.json(
          {
            state:true,
            token: token,
            user:{
              id:user._id,
              name:user.name,
              username:user.username,
              email:user.email
            }
          })
      }else{
        res.json({state:false,msg:"password does not match"});
      }
    });




  });
});

// router.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res){
//   res.json({user:req.user});
// }

router.post("/profile",verifyToken,(req,res)=>{
  jwt.verify(req.token,config.secret,(err,data) => {
    if(err){
      res.json({msg:"Access denied"})
    }else{
      res.json({msg:"Your saved data", data:data})
    }
  });

})


function verifyToken(req,res,next){

  if(typeof(req.headers['authorization']) != 'undefined' && req.headers['authorization'] != 'undefined'){
    var headerToken = req.headers['authorization'].split('')[1];
    if(headerToken !== 'undefined'){
      req.token = headerToken;
      next();
  
    }else{
      res.json({msg:"Unauthorized Request"})
    }
  }else{
    res.json({msg:"Unauthorized,Token does not have header"})
  }
  
}
module.exports = router;