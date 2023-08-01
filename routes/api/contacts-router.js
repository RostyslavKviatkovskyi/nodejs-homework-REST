import { Router } from "express";
import Joi from "joi";
import contactsServices from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

const router = Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsServices.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServices.getContactById(id);

    if (!result) {
      throw HttpError(404, `Contact with id=${id} was not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsServices.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = contactsServices.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} was not found.`);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }
    const { id } = req.params;
    const { body } = req;
    const result = await contactsServices.updateContact(id, body);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} was not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
