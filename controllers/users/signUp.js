import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

const { BASE_URL } = process.env;

const signup = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use.");
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a href='${BASE_URL}/api/auth/verify/${verificationToken}' target='_blank' >Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
});

export default signup;
