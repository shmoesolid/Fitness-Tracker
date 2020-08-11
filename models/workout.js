const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: Date,
    totalDuration: Number,

    exercises: [
      {
        type: {
          type: String,
          trim: true
        },
        name: {
          type: String,
          trim: true
        },
        distance: {
          type: Number,
          default: 0
        },
        weight: {
          type: Number,
          default: 0
        },
        sets: {
          type: Number,
          default: 0
        },
        reps: {
          type: Number,
          default: 0
        },
        duration: {
          type: Number,
          default: 0
        }
      }
    ]
  }
);

// adds new exercise and updates total duration
WorkoutSchema.methods.add = function(newExercise) {

  // add the new exercise
  this.exercises.push(newExercise);

  // calculate new total duration
  var td = 0;
  this.exercises.forEach( (exercise) => td += exercise.duration);
  this.totalDuration = td

};

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
