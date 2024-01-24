export type User = {
  id: number,
  name: string,
  username: string,
  email: string
}

export type NewUser = Pick<User, 'name' | 'username' | 'email'>;
