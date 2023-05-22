import { Request, Response } from "express";

export const getUserDetails = async (req: Request, res: Response) => {
  const { user } = req;
  return res.status(200).json(user);
};
