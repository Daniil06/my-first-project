export interface IUser {
  id: number,
  name: string,
  username: string,
  email: string
}

export interface INewUser extends Omit<IUser, 'id'> {}
