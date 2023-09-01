import { ctrlWrapper } from "../../decorators/index.js";

const getCurrent = ctrlWrapper((req, res) => {
  const { name, email } = req.user;

  res.json({
    name,
    email,
  });
});

export default getCurrent;
