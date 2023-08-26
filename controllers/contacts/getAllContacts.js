import Contact from "../../models/contact.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getAll = ctrlWrapper(async (req, res) => {
  const result = await Contact.find();
  res.json(result);
});

export default getAll;
