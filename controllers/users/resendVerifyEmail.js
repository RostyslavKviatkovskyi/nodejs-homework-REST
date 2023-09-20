import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import User from "../../models/user.js";
import "dotenv/config";

const { BASE_URL } = process.env;

const resendVerifyEmail = ctrlWrapper(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found.");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed.");
  }

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a href='${BASE_URL}/api/auth/verify/${user.verificationToken}' target='_blank' >Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Email was resent.",
  });
});

export default resendVerifyEmail;
