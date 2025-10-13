import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserResponse, UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-search',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-search.html',
  styleUrls: ['./user-search.scss']
})
export class UserSearch {

  searchForm: FormGroup;
  users: UserResponse[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.searchForm = this.fb.group({
      username: [''],
      email: ['']
    });
  }

  onSearch(): void {
    const { username, email } = this.searchForm.value;
    this.userService.listUsers().subscribe({
      next: (data) => {
        this.users = data.filter(user =>
          (username ? user.username.toLowerCase().includes(username.toLowerCase()) : true) &&
          (email ? user.email.toLowerCase().includes(email.toLowerCase()) : true)
        );
      },
      error: (err) => console.error('Erro ao buscar usuários:', err)
    });
  }

}
