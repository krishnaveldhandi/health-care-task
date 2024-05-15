import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  routerData = [
    { path: '/home', label: 'Home' },
    { path: '/doctors', label: 'Doctors list' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/location', label: 'Location' },
  ];
}
