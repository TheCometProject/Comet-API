const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.JWT_SECRET}`
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {

        const user = await User.findById(payload.id);
        if (!user) {
            return done(null, false);
        }

        done(null, user);

    } catch (err) {

        done(err, false);

    }
});

passport.use(jwtStrategy);

