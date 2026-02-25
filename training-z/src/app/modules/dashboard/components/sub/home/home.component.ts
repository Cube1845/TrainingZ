import { Component, inject, OnInit } from '@angular/core';
import { AuthDataService } from '../../../../auth/services/auth-data.service';
import { Role } from '../../../../auth/models/role';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly authDataService = inject(AuthDataService);

  userRole?: Role;

  ngOnInit(): void {
    this.userRole = this.authDataService.getUserRole();
  }
}
