import { IUser } from '../model/user.model';

export interface IUserRepository {
  create(payload: IUser): Promise<IUser>;
  update(id: string, payload: IUser): Promise<IUser>;
  delete(id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser | null>;
  getOne(id: string): Promise<IUser>;
  getMany(limit: number, offset: number): Promise<IUser[]>;
}
