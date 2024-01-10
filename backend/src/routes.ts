// Importing Area
import { Router } from 'express';
import { userSignUpController } from './users/controllers/users.signup.controller';
import { userSignInController } from './users/controllers/users.signin.controller';
import { userAccountSettingsController } from './users/controllers/users.account.settings.controller';
import { isAuthenticated } from './users/middlewares/isAuthenticated';

const router = Router();

// SignUp Route
router.post('/signup', new userSignUpController().handle);

// SignIn Route
router.post('/signin', isAuthenticated, new userSignInController().handle);

// Account Settings Route
router.patch('/settings', isAuthenticated, new userAccountSettingsController().handle);

// Exporting Area
export { router };