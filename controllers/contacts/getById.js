import Contact from "../../models/contact.js";
import HttpError from "../../helpers/HttpError.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, `Contact with id=${id} was not found.`);
  }
  res.json(result);
});

export default getById;
