import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService, RoleRequest } from '../../../core/services/role.service';

@Component({
  selector: 'app-role-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './role-create.html',
  styleUrls: ['./role-create.scss']
})
export class RoleCreate {

  roleForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  submit() {
    if (this.roleForm.invalid) {
      this.errorMessage = 'Por favor, informe o nome do role.';
      this.successMessage = '';
      return;
    }

    const payload: RoleRequest = this.roleForm.value;
    this.roleService.createRole(payload).subscribe({
      next: (res) => {
        this.successMessage = `Role ${res.name} criado com sucesso!`;
        this.errorMessage = '';
        this.roleForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao criar role';
        this.successMessage = '';
      }
    });
  }

}
