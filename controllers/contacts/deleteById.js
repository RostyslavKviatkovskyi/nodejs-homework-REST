import Contact from "../../models/contact.js";
import HttpError from "../../helpers/HttpError.js";
import { ctrlWrapper } from "../../decorators/index.js";

const deleteById = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} was not found.`);
  }
  res.json({ message: "Contact deleted" });
});

export default deleteById;
