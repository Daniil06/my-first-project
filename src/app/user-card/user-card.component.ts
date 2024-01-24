import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from "../models/users.model";
import { MatCard, MatCardActions, MatCardHeader, MatCardModule } from "@angular/material/card";
import { NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { UsersService } from "../services/users.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatCard,
    MatCardHeader,
    MatCardActions,
    NgIf,
    MatButton
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: User
  @Output() deletedUser = new EventEmitter<User>()

  private usersService: UsersService = inject(UsersService)

  openDialog() {}
  onDelete() {
    this.deletedUser.emit(this.user)
  }

}
