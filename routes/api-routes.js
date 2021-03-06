
const db = require("../models");
const mongoose = require("mongoose");

module.exports = function(app) {

    // why bother doing this when just trying to get last only
    app.get("/api/workouts", function(req, res) {

        // get all
        db.Workout
            .find({})
            .then( data => res.json(data) )
            .catch( err => res.json(err) );

    });

    // get last workout 
    // (changed to this bc sending back lots of data when just trying to get last one is dumb)
    app.get("/api/workouts/last", function(req, res) {

        // get last one and send back
        db.Workout
            .find({})
            .sort({ _id: -1 })
            .limit(1)
            .then( data => res.json(data) )
            .catch( err => res.json(err) );

    });

    // within what range?
    app.get("/api/workouts/range", function(req, res) {

        // get all up until the last sunday? or..
        // get all up until the current day of last week
        var d = new Date();
        //var lastSunday = d.setDate(d.getDate() - d.getDay() - 1);
        var lastWeek = d.setDate(d.getDate() - d.getDay() - (6 - d.getDay()) - 2);

        db.Workout
            .find({ day: { "$gte": lastWeek }})
            .then( data => res.json(data) )
            .catch( err => res.json(err) );

    });

    // adds exercise to existing workout
    app.put("/api/workouts/:id", function(req, res) {

        // set vars for readability
        var data = req.body;
        var id = req.params.id;

        // send error if not valid id
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.send("error invalid object id");

        // find and get our workout model instance by id
        db.Workout.findOne({ _id: id}).exec(
            function (err, wo) 
            {
                // error
                if (err) return res.send(err);

                // run workout schema add method and save
                wo.add(data);
                wo.save(
                    function (err, result) 
                    {
                        // send error or result
                        if (err) return res.send(err);
                        res.send(result);
                    }
                );
            }
        );
    });

    // create new workout
    app.post("/api/workouts", function({body}, res) {

        // create workout using body data and set date
        const workout = new db.Workout(body);
        workout.day = new Date().getTime();

        // create it
        db.Workout
            .create(workout)
            .then(dbData => res.json(dbData) )
            .catch(err => res.json(err) );

    });

};