import { unauthorized } from "@hapi/boom"
import { NextFunction, Request, Response } from "express"
import { PassportLocalModel, Types } from "mongoose"
import passport from "passport"
import { User } from "../models/user"

type _User = Omit<User, "password">

declare global {
  namespace Express {
    interface User extends PassportLocalModel<_User> {
      _id: Types.ObjectId
    }
  }
}


export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next()
  } else {
  throw unauthorized("You are not logged in")
  }
}

export const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.json("You are already logged in")
  }
  next()
}


export const passportAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err:Error, user:any, info:any) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.status(401).send({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(202).send({ message: 'Authentication succeeded' });    
    });
})(req, res, next);
}