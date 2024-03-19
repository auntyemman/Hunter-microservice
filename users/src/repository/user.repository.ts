import { IUserRepository } from '../interface/userRepository.interface';
import { User, IUser } from '../model/user.model';

export class UserRepository implements IUserRepository {
  async create(payload: IUser): Promise<IUser> {
    const newUser = new User(payload);
    await newUser.save();
    return newUser.toObject();
  }
  async update(id: string, payload: IUser): Promise<IUser> {
    const user = await User.findByIdAndUpdate(id, payload, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async delete(id: string): Promise<IUser> {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async getByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async getOne(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async getMany(limit: number, offset: number): Promise<IUser[]> {
    const users = await User.find().skip(offset).limit(limit);
    if (!users) {
      throw new Error('Users not found');
    }
    return users;
  }
}
