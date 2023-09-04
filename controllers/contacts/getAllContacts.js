import Contact from "../../models/contact.js";
import { ctrlWrapper } from "../../decorators/index.js";

const getAll = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  // const result = await Contact.find({ owner }, { skip, limit });
  const result = await Contact.find({ owner, ...query })
    .skip(skip)
    .limit(limit);
  res.json(result);
});

export default getAll;
