const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  distance: {
    type: Number
  },
  weight: {
    type: Number
  },
  sets: {
    type: Number
  },
  reps: {
    type: Number
  },
  duration: {
    type: Number
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;