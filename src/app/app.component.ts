import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LocationBySearchComponent } from './components/location-by-search/location-by-search.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { BookingAppointmentComponent } from './components/booking-appointment/booking-appointment.component';
import { MatDialogModule } from '@angular/material/dialog';
// import{Brow}
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    MatDialogModule,
    ListOfDoctorsComponent,
    HeaderComponent,
    NavBarComponent,
    LocationBySearchComponent,
    AppointmentsComponent,
    BookingAppointmentComponent,
  ],
})
export class AppComponent {
  title = 'list-of-doctors';
}
