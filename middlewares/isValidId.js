import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: `${id} is not a valid id.` });
  } else {
    next();
  }
};

export default isValidId;
