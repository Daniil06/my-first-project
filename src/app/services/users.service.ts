import { Injectable } from '@angular/core';
import { User } from "../models/users.model";
import { NewUser } from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = []

  saveUsers(users: User[]) {
     this.users = users
    console.log(users);
  }

  createUser(newUserData: NewUser): User {
    const maxId = this.users.reduce((max, user) =>
      (user.id > max ? user.id : max), 0);
    const newUser: User = {
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

  editUser(updatedUser: User) {
    if (Array.isArray(this.users)) {
      const index = this.users.findIndex(user => user.id === updatedUser.id);

      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser };
      }
    }
     else {
      console.error(`User with id ${updatedUser.id} not found.`);
    }
  }
}
