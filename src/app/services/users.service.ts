import { Injectable } from '@angular/core';
import { IUser } from "../models/IUser.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: IUser[] = []

  saveUsers(users: IUser[]) {
     this.users = users
    console.log(users);
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  editUser(updatedUser: IUser) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
    } else {
      console.error(`User with id ${updatedUser.id} not found.`);
    }
  }
}
