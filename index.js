const express = require("express");
const mongoose = require('mongoose');
//const authRoutes = require('./routes/authRoutes');
const cookiesSession = require('cookie-session');
const passport =require('passport');
const keys=require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongodbURI);

const app = express();

app.use(
    cookiesSession({
        maxAge:30 *24 *60 *60 *1000,
        keys:[keys.cookieKey]
    })
);
//

app.use(passport.initialize());
app.use(passport.session());


//https://accounts.google.com/o/oauth2/v2/auth?
//response_type=code&
//noderedirect_uri=http%3A%2F%2Flocalhost%3A5001%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=83938849786-n6qjmu32edkofc4ctoangeeq9f138gph.apps.googleusercontent.com

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
