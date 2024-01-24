import { Component, Inject, OnInit } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { User } from "../models/users.model";
import { UsersService } from "../services/users.service";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatDialogActions,
    MatInput,
    MatButton,
    MatDialogContent
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent implements OnInit{
  form: FormGroup;
  isEdit: boolean;

  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, isEdit: boolean},
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
    this.isEdit = data.isEdit;
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.form.patchValue(this.data.user);
    }
  }

  onClose() {
    console.log('onClose() called');
    this.dialogRef.close(null)
  }

  onSubmit() {
    if (this.form.valid) {
      const userData = this.form.value;

      if (this.data.isEdit) {
        this.usersService.editUser({...this.data.user, ...userData})
      }
      this.dialogRef.close(userData)
    }
  }
}
