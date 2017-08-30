const User = require('../models/user');

exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;

  // See if a user with the give email exists

  User.findOne({email: email}, function(err, existingUser){
    if (err) {
      return next(err);
    }
    // If a user with email does exist, return an Error

    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }
    // if a user with email does NOT exist, create and save user record

    const user = new User({
      email: email,
      password: password
    });
    // Repond to reques indicating the user was created

    user.save(function(err){
      if (err) {
        return next(err);
      }

      res.json({ success: true });
    });

  });



}
