import "dotenv/config";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.js";

export default function setJwtStrategy() {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };

  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err, user) => {
        if (err) return done(err, false);
        return user ? done(null, user) : done(null, false);
      });
    })
  );
  return passport;
}
