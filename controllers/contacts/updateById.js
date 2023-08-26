import Contact from "../../models/contact.js";
import HttpError from "../../helpers/HttpError.js";
import { ctrlWrapper } from "../../decorators/index.js";

const updateById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} was not found.`);
  }
  res.json(result);
};

export default {
  updateById: ctrlWrapper(updateById),
};
