let mongoose = require('mongoose');
mongoose.connect(require('./config').MONGO_HOST);

module.exports = mongoose;