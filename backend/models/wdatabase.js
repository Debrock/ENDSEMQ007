const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let WDatabase = new Schema({
    name: {
        type: String
    },
    bmi: {
        type: String
    },
});

// export default mongoose.model('WDatabase', WDatabase);

module.exports = WDatabase;