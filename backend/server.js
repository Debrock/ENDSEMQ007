const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const WDatabase = require("./models/wdatabase");

require("dotenv").config();

const app = express();
const router = express.Router();
const mongo_url = process.env.URL;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(''+mongo_url);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

var wdata = new mongoose.model("wdata", WDatabase);


router.route('/wdata').get((req, res) => {
    wdata.find((err, wdata) => {
        if (err)
            console.log(err);
        else
            res.json(wdata);
    });
});

router.route('/wdata/:id').get((req, res) => {
    wdata.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/wdata/calculate').post((req, res) => {
    let bmiresult = new WDatabase(req.body);
    bmiresult.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});


app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));