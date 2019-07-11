var express = require("express");
var methodOverride = require("method-override");
var router  = express.Router();
var User = require("../models/user");

router.get("/", function(req, res){
	//pass users
   res.render("users/index");
});

module.exports = router;