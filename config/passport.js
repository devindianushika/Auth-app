// const JwtStrategy = require('passport-jwt').Strategy,
//  ExtractJwt = require('passport-jwt').ExtractJwt;

// const config = require('./database');
// const User = require('../models/user');


// const opts = {};   //options empty object
// opts.jwtFromRequest =ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.secret;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';


// module.exports = function (passport){

// passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    
//     User.findUserById({ _id: jwt_payload._doc._id }, function (err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
          
//         }
    
//     });
// }));
// }