import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import isEmail from "validator/lib/isEmail";

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "invalid email"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

export const User = model("User", UserSchema);
