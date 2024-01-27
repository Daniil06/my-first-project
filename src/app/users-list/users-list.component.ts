import { Component, inject, Input, OnInit } from '@angular/core';
import { IUser } from "../models/users.model";
import { UsersApiService } from "../services/users-api.service";
import { UserCardComponent } from "../user-card/user-card.component";
import { NgForOf } from "@angular/common";
import { UsersService } from "../services/users.service";
import { MatButton } from "@angular/material/button";
import { CreateEditUserComponent } from "../create-edit-user/create-edit-user.component";
import { MatDialog, MatDialogClose } from "@angular/material/dialog";
import { LocalStorageService } from "../services/local-storage.service";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CreateEditUserComponent,
    NgForOf,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{

    private usersApiService = inject(UsersApiService)
    public usersService = inject(UsersService)
    private dialog = inject(MatDialog)
    private localStorageService = inject(LocalStorageService)
  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
      const storeUsers = this.localStorageService.getItem('users');
      if (storeUsers && storeUsers.length > 0) {
        this.usersService.saveUsers(storeUsers);
      } else {
        this.usersApiService.getUsers()
          .subscribe({
            next: (res) => {
              this.usersService.saveUsers(res);
              this.localStorageService.setItem('users', res);
            },
            error: (error) => {
              console.error('error in usersList', error)
            }
          })
      }
  }
  onDelete(user: IUser) {
     this.usersService.deleteUser(user.id)
     // this.usersService.users
    localStorage.setItem('users', JSON.stringify(this.usersService.users));
  }

  onAddUser() {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { user: null, isEdit: false }
    });
    // dialogRef.componentInstance.isEdit = false;
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('Result from dialog:', result);
        if (result) {
          this.usersService.createUser(result);
          localStorage.setItem('users', JSON.stringify(this.usersService.users))
        }
      })
  }

  onEdit(user: IUser) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: { user, isEdit: true }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('Result from dialog:', result);
        if (result) {
          this.usersService.editUser(result);
          console.log('Updated users:', this.usersService.users);
          this.localStorageService.setItem('users', this.usersService.users)
        }
      })
  }
}
