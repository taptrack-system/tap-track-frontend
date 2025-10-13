import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuditLogResponse, AuditLogService } from '../../../core/services/audit-log.service';

@Component({
  selector: 'app-log-list',
  imports: [
    CommonModule
  ],
  templateUrl: './log-list.html',
  styleUrl: './log-list.scss'
})
export class LogList implements OnInit {

  logs: AuditLogResponse[] = [];
  errorMessage = '';

  constructor(private auditLogService: AuditLogService) {

  }

  ngOnInit(): void {
      this.loadLogs();
  }

  loadLogs(): void {
    this.auditLogService.listLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erro ao listar logs:', err);
        this.errorMessage = 'Erro ao carregar logs';
      }
    });
  }

}
