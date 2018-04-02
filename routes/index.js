var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Data = require("../models/data");

router.get("/", function(req, res) {
  res.render("home");
});

router.get("/register", function(req, res){
   //res.send("Registration Page");
  res.render("register");
});

router.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username, 
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender
  });
	User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      //req.flash("error", err.message);
      return res.redirect("register");
    } else {
      passport.authenticate("local")(req, res, function() {
        //req.flash("success", "Welcome to Yelp Camp " + user.username);
        res.redirect("/");
      })
    }
  });
//   newUser.save(function (err){
//     if(err){console.log(err); res.redirect("/register");} else{res.redirect("/");}
//   });
});

router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function(req, res) {
  
});

router.get("/logout", function(req, res){
		res.render("logout");
//   req.logout();
//   req.flash("success", "Logged out.");
//   res.redirect("/");
});

router.get("/data", function(req, res){
   //res.send("Registration Page");
  res.render("data");
});

router.post("/data", function(req, res) {
  var passedTime = convertToNum(req.body.hour, req.body.minute, req.body.second);
  //console.log(req.body.hour, req.body.minute, req.body.second);
  var newData = new Data({
    distance: req.body.distance, 
    time: passedTime
  });
  newData.save(function (err){
    if(err){console.log(err); res.redirect("/data");} else{res.redirect("/");}
  });
});

//TODO solve casting issue for passing values better than dividing by 1
function convertToNum(hours, minutes, seconds){
  //console.log((hours*60 + seconds/60));
	var tempTime = ((minutes/1)+(hours*60 + seconds/60));
  //console.log(minutes + (hours*60 + seconds/60));
	return tempTime;
}

module.exports = router;