var express  = require('express');
var app      = express();
var passport = require('passport');

var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(cookieParser());
app.use(bodyParser());

app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}
));

app.use(session({ secret: 'mysecret' })); // session secret
app.use(passport.initialize());

app.post('/login',
passport.authenticate('local', { successRedirect: '/success',
                                   failureRedirect: '/fail', failureFlash: true })
  );

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.get('/fail', function (req, res) {
    res.send('fail')
  })
  app.get('/success', function (req, res) {
    res.send('success: username: ' + req.session.passport.user.user)
  })

  app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
  })

  passport.use(new LocalStrategy({
    passReqToCallback : true},
    function(req, username, password, done) {
    return done(null, {user: 'nate'});

    }
  ));

  
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
