import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UserResponse {
  id: number;
  username: string;
  fullName: string;
  email: string;
  status: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/identity-profiles/users';

  constructor(private http: HttpClient) {}

  // CADASTRAR USUÁRIO 
  createUser(user: UserRequest, performedBy: string = 'admin'): Observable<UserResponse> {
    const headers = new HttpHeaders().set('X-Performed-By', performedBy);
    return this.http.post<UserResponse>(this.apiUrl, user, { headers });
  }

  // LISTAR USUÁRIOS
  listUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(this.apiUrl);
  }

  // BUSCAR USUÁRIO POR ID
  getUser(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  // EXCLUIR USUÁRIO POR ID 
  deleteUser(id: number, performedBy: string): Observable<void> {
    const headers = new HttpHeaders().set('X-Performed-By', performedBy);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
  
}
