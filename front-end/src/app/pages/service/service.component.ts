import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

  paginatedServices: any[] = [];
  totalServices = 0;
  totalPages = 0;
  currentPage = 1;
  pageSize = 9;


  constructor(private paginationService: ServiceService) { }

  ngOnInit(): void {
    this.getPaginatedServices();
  }

  getPaginatedServices(): void {
    this.paginationService.getPaginatedServices(this.currentPage, this.pageSize)
      .subscribe((data: { services: any[]; totalServices: number; totalPages: number; currentPage: number; }) => {
        this.paginatedServices = data.services;
        this.totalServices = data.totalServices;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPaginatedServices();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPaginatedServices();
    }
  }
  getPagesArrays(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  getPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.getPaginatedServices();
    }
  }
}
