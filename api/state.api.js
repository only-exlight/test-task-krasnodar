let router = require('express').Router(),
    State = require('../models/state.model').State,
    recordID;
//Inicialization
let inicialization = State.find({},(err,result) => {
    if (result.length != 0) recordID = result[0]._id;
}).count((err,count)=>{
    if (err) console.log(err);
    if (count == 0) {
        let defaultState = new State({data: [0,0,0,0]});
        defaultState.save((err,doc) => {
            recordID = doc._id;
            if (err) console.log(err);
        });
    }
})

router.post('/save-state', (req, res) => {
    State.update({_id: recordID}, req.body, err => {
         if (err) {
            console.log(err);
            res.status(501).end();
        } else {
            console.log('Send state!')
            res.status(200).end();
        }
    })
})

router.post('/download', (req, res) => {
    State.find({}, (err, result) => {
        if (err) {
            console.log(err);
            res.status(501).end();
        } else {
            console.log('Send state!')
            res.status(200).end(JSON.stringify(result[0]));
        }
    })
})

module.exports = router;