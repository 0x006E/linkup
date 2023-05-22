import { Schema, Types, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { z } from "zod";

export const UserZodSchema = z.object({
  _id: z.custom<Types.ObjectId>(),
  name: z.string().min(2).max(30),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(100)
    .refine((value) => value.trim() === value) // No leading or trailing white spaces
    .refine((value) => !/\s/.test(value)),
});

export const UserMongooseSchema = new Schema(
  {
    name: { type: String, minlength: 2, maxLength: 30 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserMongooseSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

export type User = z.infer<typeof UserZodSchema>;
export const User = model("User", UserMongooseSchema);
