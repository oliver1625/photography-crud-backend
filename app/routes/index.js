const express = require( 'express');

const Tutorial = require( './tutorial')
const User = require( './auth')

const app = express();


app.use('/tutorial', Tutorial)
app.use('/auth', User)



module.exports = app;