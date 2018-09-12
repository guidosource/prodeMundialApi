require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//cors
app.use(cors());

//Controllers
app.use(require('./controller/index'));


//Conexion db
mongoose.connect(process.env.URLBASE);

app.listen(process.env.PORT);
