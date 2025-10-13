import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuditLogResponse {
  id: number;
  entity: string;
  entityId: number;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  private apiUrl = 'http://localhost:8080/identity-profiles/audit-logs';

  constructor(private http: HttpClient) {}

  listLogs(): Observable<AuditLogResponse[]> {
    return this.http.get<AuditLogResponse[]>(this.apiUrl);
  }

  // Se quiser chamar “logEvent” diretamente do frontend (opcional)
  logEvent(entity: string, entityId: number, action: string, performedBy: string, details: string): Observable<void> {
    const payload = { entity, entityId, action, performedBy, details };
    return this.http.post<void>(this.apiUrl, payload);
  }
  
}
