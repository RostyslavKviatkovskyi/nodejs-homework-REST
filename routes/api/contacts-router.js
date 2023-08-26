import { Router } from "express";
// import contactsController from "../../controllers/contacts-controllers.js";
import contactsController from "../../controllers/contacts/index.js";
import { validateBody } from "../../decorators/index.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

const router = Router();

router.get("/", contactsController.getAll);

router.get("/:id", isValidId, contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.contactAddSchema),
  contactsController.add
);

router.delete("/:id", isValidId, contactsController.deleteById);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactAddSchema),
  contactsController.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactsFavoriteUpdate),
  contactsController.updateFavorite
);

export default router;
