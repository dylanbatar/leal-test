import { IUser } from "../../core/users/IUser";

export interface IGetUserPoints {
  getUserPoints(userId: string): Promise<IUser | null>;
}
