import base64url from 'base64url';

import { IUser } from '../model/user.model';
import { hashPassword, comparePasswords } from '../utils/encryptPassword';
import { calculateAge } from '../utils/calculateAge';
import { validatePhoneNumber } from '../utils/verifyPhoneNumber';
import { IUserRepository } from '../interface/userRepository.interface';
import { sendVerifyEmail } from '../utils/sendVerifyEmail';
import { verifyJWT } from '../configs/jwt';
import { forgotPasswordMail } from '../utils/emails/forgotPassword';
import { verificationCode } from '../utils/verificationCode';

export class UserService {
  constructor(private readonly User: IUserRepository) {}
  async createUser(payload: IUser): Promise<IUser> {
    const user = await this.User.getByEmail(payload.email);
    if (user) {
      if (user.metaData.isActive === false) {
        throw new Error('Please verify your email, check your email');
      }
      throw new Error('User already exists');
    }
    const hashedPassword = await hashPassword(payload.password);
    payload.password = hashedPassword;
    const newUser = await this.User.create(payload);
    await sendVerifyEmail(payload._id, payload.accountType, payload.email, payload.firstName);
    return newUser;
  }

  async updateUser(userId: string, payload: IUser): Promise<IUser | null> {
    payload.age = calculateAge(payload.DOB);
    payload.phone = validatePhoneNumber(payload.phone);
    payload.alternatePhone = validatePhoneNumber(payload.alternatePhone);
    const updatedUserData = JSON.parse(JSON.stringify(payload));
    const user = await this.User.update(userId, updatedUserData);
    return user;
  }

  async verifyUserEmail(token: string): Promise<IUser> {
    const decodedToken = base64url.decode(token);
    const decoded = await verifyJWT(decodedToken);
    const { userId } = decoded;
    const user = await this.User.getOne(userId);
    if (user.metaData.isActive === true) {
      throw new Error('Email already verified');
    }
    return user;
  }

  async forgotUSerPassword(email: string): Promise<IUser | null> {
    const user = await this.User.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const code = verificationCode();
    user.metaData.verificationCode = code;
    await this.User.update(user._id, user);
    await forgotPasswordMail(email, user.firstName, code);
    return user;
  }

  async resetUserPassword(email: string, password: string): Promise<IUser> {
    const user = await this.User.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await this.User.update(user._id, user);
    return user;
  }

  async confirmUserCode(email: string, code: string): Promise<IUser> {
    const user = await this.User.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.metaData.verificationCode !== code) {
      throw new Error('Code does not match or invalid code');
    }
    user.metaData.verificationCode = '';
    await this.User.update(user._id, user);
    return user;
  }

  async signUserIn(email: string, password: string): Promise<IUser> {
    const user = await this.User.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      throw new Error('Wrong password');
    }
    if (user.metaData.isActive === false) {
      throw new Error('Please verify your email, check your email');
    }
    return user;
  }
}
