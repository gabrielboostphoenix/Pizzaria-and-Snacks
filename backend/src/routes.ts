// Importing Area
import { Router } from 'express';
import { userSignUpController } from './users/controllers/users.signup.controller';
import { userSignInController } from './users/controllers/users.signin.controller';
import { userAccountNameSettingsController } from './users/controllers/users.account.name.setting.controller';
import { userAccountPasswordSettingsController } from './users/controllers/users.account.password.setting.controller';
import { isAuthenticated } from './users/middlewares/isAuthenticated';

const router = Router();

// SignUp Route
router.post('/signup', new userSignUpController().handle);

// SignIn Route
router.post('/signin', isAuthenticated, new userSignInController().handle);

// Account Name Settings Route
router.patch('/settings/name', isAuthenticated, new userAccountNameSettingsController().handle);

// Account Password Settings Route
router.patch('/settings/password', isAuthenticated, new userAccountPasswordSettingsController().handle);

// Exporting Area
export { router };