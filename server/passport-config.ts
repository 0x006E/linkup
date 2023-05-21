import passport from "passport";
import { User } from "./models/user";

export default function initializePassport() {
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}
