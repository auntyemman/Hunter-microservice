import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { authUser } from '../middlewares/userAuth';

export const auth: Router = Router();
const userController = new UserController();

auth.post('/signup', userController.signUp.bind(userController));
auth.get('/verify-email', userController.verifyEmail.bind(userController));
auth.post('/forgot-password', userController.forgotPassword.bind(userController));
auth.post('/reset-password', userController.resetPassword.bind(userController));
auth.post('/confirm-code', userController.confirmUserCode.bind(userController));
auth.post('/signin', userController.signIn.bind(userController));

auth.post('/profile', authUser, userController.updateProfile.bind(userController));
