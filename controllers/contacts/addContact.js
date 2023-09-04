import Contact from "../../models/contact.js";
import { ctrlWrapper } from "../../decorators/index.js";

const add = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
});

export default add;
