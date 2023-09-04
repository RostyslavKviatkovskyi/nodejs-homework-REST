import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorators/index.js";

const signOut = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Signout success.",
  });
});

export default signOut;
