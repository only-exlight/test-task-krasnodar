let mongoose = require('../configs/db.conect'),
    Schema = mongoose.Schema,
    State = new Schema({
        data: Array
    });

module.exports.State = mongoose.model('State', State);