const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require ('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

//set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    //max age of cookie 24 hours * 60 minutes * 60 seconds * 1000 millisecond
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//intialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


//create home route
app.get('/', (req, res)=> {
    res.render('home');
});

app.listen(PORT, () => {
    console.log('App is now listening for request on http://localhost:'+ PORT);
})