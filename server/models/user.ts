import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export const UserSchema = new Schema(
  {
    Name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

export const User = model("User", UserSchema);
