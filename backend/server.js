const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connection to Database Established'); 
})

const userRoute = require('./controllers/AuthenticationController');
app.use('/users', userRoute);
const customerRoute = require('./controllers/CustomerAuthenticationController');
app.use('/customers', customerRoute);

app.listen(port, () => {
    console.log('Server Up and Running at Port => ' + port);
})