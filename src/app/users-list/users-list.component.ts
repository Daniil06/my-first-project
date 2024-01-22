import { Component, inject, Input, OnInit } from '@angular/core';
import { IUser } from "../models/IUser.model";
import { UsersApiService } from "../services/users-api.service";
import { UserCardComponent } from "../user-card/user-card.component";
import { NgForOf } from "@angular/common";
import { UsersService } from "../services/users.service";
import { MatButton } from "@angular/material/button";

import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CreateEditUserComponent,
    NgForOf,
    MatButton
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  usersList: IUser[] = []

  constructor(
    private usersApiService: UsersApiService,
    private usersService: UsersService,
    private dialog: MatDialog
  ){
  }
  ngOnInit(): void {
    this.usersApiService.getUsers()
      .subscribe({
        next: (res) => {
          this.usersService.saveUsers(res)
          this.usersList = this.usersService.users;
        },
        error: (error) => {
          console.error('error in userslist', error)
        }
      })
  }
  onDelete(user: IUser) {
     this.usersService.deleteUser(user.id)
     this.usersList = this.usersService.users
  }

  onAddUser() {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { user: null, isEdit: false }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          console.log('До:', this.usersList);
          const maxId = this.usersList.reduce((max, user) =>
            user.id > max ? user.id : max, 0)
          const newUser: IUser = {
            id: maxId + 1,
            name: result.name,
            username: result.username,
            email: result.email,
          };
          this.usersList = [...this.usersList, newUser];
          console.log('После:', this.usersList);
        }
      })
  }

  onEdit() {

  }
}
