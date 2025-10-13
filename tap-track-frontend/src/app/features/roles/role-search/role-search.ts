import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoleResponse, RoleService } from '../../../core/services/role.service';

@Component({
  selector: 'app-role-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './role-search.html',
  styleUrl: './role-search.scss'
})
export class RoleSearch {

  searchForm: FormGroup;
  roles: RoleResponse[] = [];

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  onSearch(): void {
    const name = this.searchForm.get('name')?.value ?? '';
    this.roleService.listRoles().subscribe({
      next: (data) => {
        this.roles = data.filter(r =>
          name ? r.name.toLowerCase().includes(name.toLowerCase()) : true
        );
      },
      error: (err) => console.error('Erro ao buscar roles:', err)
    });
  }

}
