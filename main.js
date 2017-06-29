let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = require('./configs/config').PORT;

app.use(express.static('./client'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({type: 'application/json'}));
app.use('/api', require('./api/state.api'));

app.listen(port,(err)=>{
    if (err) throw err;
    console.log('Server is run: PORT ' + port + '...');
})
