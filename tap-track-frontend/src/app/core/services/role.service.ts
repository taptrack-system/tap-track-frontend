import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RoleRequest {
  name: string;
  description?: string;
}

export interface RoleResponse {
  id: number;
  name: string;
  description: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${environment.apiBaseUrl}/identity-profiles/roles`;

  constructor(private http: HttpClient) {}

  createRole(role: RoleRequest, performedBy: string = 'admin'): Observable<RoleResponse> {
    const headers = new HttpHeaders().set('X-Performed-By', performedBy);
    return this.http.post<RoleResponse>(this.apiUrl, role, { headers });
  }

  listRoles(): Observable<RoleResponse[]> {
    return this.http.get<RoleResponse[]>(this.apiUrl);
  }

  getRole(name: string): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.apiUrl}/${name}`);
  }

  deleteRole(name: string, performedBy: string = 'admin'): Observable<void> {
    const headers = new HttpHeaders().set('X-Performed-By', performedBy);
    return this.http.delete<void>(`${this.apiUrl}/${name}`, { headers });
  }
  
}
