const express = require ('express');
const expbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const redisClient = redis.createClient();
const PORT = process.env.PORT || 3000;
const app = express();

redisClient.on('connect', function(){
  console.log("Connected to Redis");
});

//Template engine
app.engine('handlebars', expbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Allow us to perform a delete request with a form
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/user', require('./routes/user.js'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));