import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserRequest, UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './user-create.html',
  styleUrl: './user-create.scss'
})
export class UserCreate {

  userForm: FormGroup;
  roles = ['ADMIN', 'CUSTOMER', 'SUPPLIER', 'MANAGER'];
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      fullName: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      roles: [[], Validators.required]
    });
  }

  submit() {
    if (this.userForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      this.successMessage = '';
      return;
    }

    const payload: UserRequest = this.userForm.value;
    this.userService.createUser(payload).subscribe({
      next: (res) => {
        this.successMessage = `Usuário ${res.username} criado com sucesso!`;
        this.errorMessage = '';
        this.userForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao criar usuário';
        this.successMessage = '';
      }
    });
  }

}
