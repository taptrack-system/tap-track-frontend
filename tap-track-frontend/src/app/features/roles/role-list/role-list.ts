import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoleResponse, RoleService } from '../../../core/services/role.service';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './role-list.html',
  styleUrl: './role-list.scss'
})
export class RoleListComponent implements OnInit {

  roles: RoleResponse[] = [];
  loading = false;
  error?: string;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loading = true;
    this.roleService.listRoles().subscribe({
      next: (data) => {
        this.roles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao listar roles:', err);
        this.error = 'Falha ao carregar roles. Tente novamente mais tarde.';
        this.loading = false;
      }
    });
  }

}
