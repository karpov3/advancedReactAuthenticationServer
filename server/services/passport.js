const passport = require('passport')
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStategy = require('passport-local');

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStategy(localOptions, function (email, password, done) {
  // Verify this email and password, call done with the user
  // it it is the correct email and password/otherwise, call done with false
  User.findOne({email:email}, function(err, user){
    if(err) { return done(err);}
    if(!user) { return done(null, false); }

    // compare password - is 'password' equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if(err) { return done(err);}
      if(!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our databae
  // If it doues, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this stategy
passport.use(jwtLogin);
passport.use(localLogin);
