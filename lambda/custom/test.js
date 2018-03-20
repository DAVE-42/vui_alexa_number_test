var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var skill = require('./lib/skill');

app.use(bodyParser.json());
app.post('/', function (req, res) {
  let context = {
    succeed: function (result) {
      console.log(result);
      res.json(result);
    },
    fail: function (error) {
      console.log(error);
    }
  };

  skill(req.body, context);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
