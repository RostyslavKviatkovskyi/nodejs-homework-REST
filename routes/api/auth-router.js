import { Router } from "express";
import * as authController from "../../controllers/users/index.js";
import userSchemas from "../../schemas/user-schemas.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, upload } from "../../middlewares/index.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  upload.single("avatarURL"),
  validateBody(userSchemas.userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  validateBody(userSchemas.userSigninSchema),
  authController.signin
);

authRouter.patch(
  "/avatar",
  upload.single("avatarURL"),
  authenticate,
  authController.updateAvatar
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signOut);

export default authRouter;
