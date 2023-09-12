import { ctrlWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";
import User from "../../models/user.js";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";

const avatarPath = path.resolve("public", "avatars");

const updateAvatar = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  if (!req.file) {
    throw HttpError(400, "No avatar file provided.");
  }

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);

  Jimp.read(`${oldPath}`)
    .then((avatar) => {
      return avatar.resize(250, 250).write(`${newPath}`);
    })
    .catch((error) => {
      console.log(error.message);
    });

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);

  const result = await User.findByIdAndUpdate(
    owner,
    { avatarURL },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, `User with id=${owner} was not found.`);
  }
  res.json({
    avatarURL,
  });
});

export default updateAvatar;
