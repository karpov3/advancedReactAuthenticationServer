const User = require('../models/user');

exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  // See if a user with the give email exists

  User.findOne({email: email})

  // If a user with email does exist, return an Error

  // if a user with email does NOT exist, create and save user record

  // Repond to reques indicating the user was created
}
