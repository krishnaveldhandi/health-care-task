import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
})
export class RedirectComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    // this.router.navigate(['/doctors-list']);
  }
}
