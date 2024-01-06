// Importing area
import { Router } from 'express';
import { userSignUpController } from './users/controllers/users.signup.controller';
import { userSignInController } from './users/controllers/users.signin.controller';
import { isAuthenticated } from './users/middlewares/isAuthenticated';

const router = Router();

// SignUp route
router.post('/signup', new userSignUpController().handle);

// SignIn route
router.post('/signin', isAuthenticated, new userSignInController().handle);

// Exporting area
export { router };