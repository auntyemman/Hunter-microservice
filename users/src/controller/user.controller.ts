import { Request, Response, NextFunction } from 'express';

import { UserService } from '../service/user.service';
import { validateRequest } from '../utils/requestValidator';
import { SignUpDTO } from '../dto/signUp.dto';
import { ProfileDTO } from '../dto/profile.dto';
import { UserRepository } from '../repository/user.repository';
// import { errorHandler } from '../utils/errorHandler';

export class UserController {
  private readonly userRepository = new UserRepository();
  private readonly userService = new UserService(this.userRepository);

  async signUp(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    try {
      const validated = await validateRequest(SignUpDTO, req.body);
      const newUser = await this.userService.createUser(validated);
      if (!newUser) {
        return res.status(400).json({
          status: 'error',
          message: 'User already exists',
        });
      }
      return res.status(201).json({
        status: 'success',
        message: `Verification link sent to your email, please check your email`,
        data: newUser,
      });
    } catch (error: any) {
      next(error);
    }
  }
  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    const userId = res.locals.user.userId;
    try {
      const validated = await validateRequest(ProfileDTO, req.body);
      const userRepository = new UserRepository();
      const userService = new UserService(userRepository);
      const newUser = await userService.updateUser(userId, validated);
      return res.status(200).json({
        status: 'success',
        message: 'profile updated',
        data: newUser,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    const { token } = req.query as { token: string };
    try {
      if (!token) {
        return res.status(400).json({ message: 'No token found' });
      }
      const user = await this.userService.verifyUserEmail(token);
      return res.status(200).json({
        status: 'success',
        message: 'Email verified successfully.',
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    const { email } = req.body;
    try {
      const user = await this.userService.forgotUSerPassword(email);
      if (!user) {
        return res.status(400).json({ message: 'User not found with the given email' });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Password reset link sent to your email',
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    const { password } = req.body;
    const { email } = req.query as { email: string };
    try {
      const user = await this.userService.resetUserPassword(email, password);
      if (!user) {
        return res.status(400).json({ message: 'User not found with the given email' });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Password reset successfully.',
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async confirmUserCode(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    const { code } = req.body;
    const { email } = req.query as { email: string };
    try {
      const user = await this.userService.confirmUserCode(email, code);
      if (!user) {
        return res.status(400).json({ message: 'User not found with the given email' });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Code verified successfully.',
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction): Promise<object | void> {
    const { email, password } = req.body;
    try {
      const user = await this.userService.signUserIn(email, password);
      return res.status(200).json({
        status: 'success',
        message: 'Logged in successfully',
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }
}
