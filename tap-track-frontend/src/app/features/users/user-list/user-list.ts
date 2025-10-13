import { Component, OnInit } from '@angular/core';
import { UserResponse, UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {

  users: UserResponse[] = [];
  filteredUsers: UserResponse[] = [];
  errorMessage = '';
  searchUsername = '';
  searchEmail = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.listUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erro ao listar usuários:', err);
        this.errorMessage = 'Erro ao carregar usuários';
      }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Tem certeza que deseja excluir esse usuário?')) return;

    const performedBy = 'admin'; // TODO: pegar usuário logado
    this.userService.deleteUser(id, performedBy).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.filteredUsers = this.filteredUsers.filter(u => u.id !== id);
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erro ao deletar usuário:', err);
        this.errorMessage = 'Erro ao excluir usuário';
      }
    });
  }

  onSearch(): void {
    this.filteredUsers = this.users.filter(user =>
      (!this.searchUsername || user.username.toLowerCase().includes(this.searchUsername.toLowerCase())) &&
      (!this.searchEmail || user.email.toLowerCase().includes(this.searchEmail.toLowerCase()))
    );
  }

  resetSearch(): void {
    this.searchUsername = '';
    this.searchEmail = '';
    this.filteredUsers = [...this.users];
  }

}
