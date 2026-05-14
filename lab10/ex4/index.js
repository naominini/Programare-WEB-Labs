var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();

var schemaName = new Schema({
    request: String,
    title: String,
    id: Number
}, {
    collection: 'test'
});

schemaName.index({ request: 'text' });

var Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://localhost:27017/db08');

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/find/:query', function(req, res) {
    var query = req.params.query;
    Model.find({
        $text: {
            $search: query
        }
    }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result);
        } else {
            res.send(JSON.stringify({
                error: 'Error'
            }))
        }
    })
})

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});