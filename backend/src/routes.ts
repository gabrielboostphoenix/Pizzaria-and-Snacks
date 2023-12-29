import { Router } from "express";
import { userSignUpController } from "./users/controllers/users.signup.controller";
import { isAuthenticated } from "./users/middlewares/isAuthenticated";
import { userSignInController } from "./users/controllers/users.signin.controller";

const router = Router();

router.post('/signin', isAuthenticated, new userSignInController().handle);

router.post('/signup', new userSignUpController().handle);

export { router };