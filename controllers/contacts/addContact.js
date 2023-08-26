import Contact from "../../models/contact.js";
import { ctrlWrapper } from "../../decorators/index.js";

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

export default {
  add: ctrlWrapper(add),
};

// export default add;
