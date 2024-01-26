// Importing Area
import { Router } from 'express';
import { userSignUpController } from './users/controllers/users.signup.controller';
import { userSignInController } from './users/controllers/users.signin.controller';
import { userAccountNameSettingsController } from './users/controllers/users.account.name.setting.controller';
import { userAccountPasswordSettingsController } from './users/controllers/users.account.password.setting.controller';
import { categoryListController } from './categories/controllers/categories.list.controller';
import { categoryAddController } from './categories/controllers/categories.add.controller';
import { categoryUpdateController } from './categories/controllers/categories.update.controller';
import { categoryRemoveController } from './categories/controllers/categories.remove.controller';
import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// SignUp Route
router.post('/signup', new userSignUpController().handle);

// SignIn Route
router.post('/signin', isAuthenticated, new userSignInController().handle);

// Account Name Settings Route
router.patch('/settings/name', isAuthenticated, new userAccountNameSettingsController().handle);

// Account Password Settings Route
router.patch('/settings/password', isAuthenticated, new userAccountPasswordSettingsController().handle);

// Category Route
router.get('/category', isAuthenticated, new categoryListController().handle);

// Category Adding Route
router.post('/category/add', isAuthenticated, new categoryAddController().handle);

// Category Update Route
router.patch('/category/update', isAuthenticated, new categoryUpdateController().handle);

// Category Removing Route
router.delete('/category/remove', isAuthenticated, new categoryRemoveController().handle);

// Exporting Area
export { router };