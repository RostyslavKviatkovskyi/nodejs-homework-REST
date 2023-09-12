import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";

const signup = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use.");
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
});

export default signup;
