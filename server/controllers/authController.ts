import { Request, Response } from "express";
import passport from "passport";

export const loginController = (req: Request, res: Response) =>
  passport.authenticate("local")(req, res, () => {
    res.status(200).json({ message: "Login successful" });
  });

export const logoutController = (req: Request, res: Response) => {
  req.logout((e) => req.log.info(e));
  res.redirect("/");
};
