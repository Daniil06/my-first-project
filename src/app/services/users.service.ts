import { Injectable } from '@angular/core';
import { IUser } from "../models/users.model";
import { INewUser } from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: IUser[] = []

  saveUsers(users: IUser[]) {
     this.users = users
    console.log(users);
  }

  createUser(newUserData: INewUser): IUser {
    const maxId = this.users.reduce((max, user) =>
      (user.id > max ? user.id : max), 0);
    const newUser: IUser = {
      id: maxId + 1,
      name: newUserData.name,
      username: newUserData.username,
      email: newUserData.email,
    }
    this.users = [...this.users, newUser];
    return newUser
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  editUser(updatedUser: IUser) {
    if (Array.isArray(this.users)) {
      const index = this.users.findIndex(user => user.id === updatedUser.id);

      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
      }
    }
     else {
      console.error(`IUser with id ${updatedUser.id} not found.`);
    }
  }
}
