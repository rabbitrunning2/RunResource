var express = require("express");
var methodOverride = require("method-override");
var router  = express.Router();
var User = require("../models/user");

router.get("/", function(req, res){
   res.render("users/index");
});

module.exports = router;