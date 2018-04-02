var mongoose = require("mongoose");

//TODO 
//add Date
//add Pace
var DataSchema = new mongoose.Schema({
  distance: Number,
  time: Number,
  pace: Number,
  user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
  }
});

module.exports = mongoose.model("Data", DataSchema);