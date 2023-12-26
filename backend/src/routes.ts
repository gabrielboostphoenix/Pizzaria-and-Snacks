import { Router } from "express";
import { userSignUpController } from "./users/controllers/users.signup.controller";
import { userSignInController } from "./users/controllers/users.signin.controller";

const router = Router();

router.post('/signin', new userSignInController().handle);

router.post('/signup', new userSignUpController().handle);

export { router };