import { Component, inject, OnInit } from '@angular/core';
import { AuthDataService } from '../../../auth/services/auth-data.service';
import { Role } from '../../../auth/models/role';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly authDataService = inject(AuthDataService);

  userRole?: Role;

  ngOnInit(): void {
    this.userRole = this.authDataService.getAuthData().role;
  }
}
