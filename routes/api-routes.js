
var db = require("../models");

module.exports = function(app) {

    // why bother doing this when just trying to get last only
    app.get("/api/workouts", function(req, res) {

        // ..

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

    // ..
    app.get("/api/workouts/range", function(req, res) {

        // ..

    });

    // ..
    app.put("/api/workouts/:id", function({body}, res) {

        // push exercise into workout by workout id
        var data = body;

    });

    // ..
    app.post("/api/workouts", function({body}, res) {

        // create workout using body data

    });

};