import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LocationBySearchComponent } from './components/location-by-search/location-by-search.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { BookingAppointmentComponent } from './components/booking-appointment/booking-appointment.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { DoctorsComponent } from './components/doctors/doctors.component';

export const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: HeaderComponent },
      {
        path: 'doctors',
        component: RedirectComponent,
        children: [
          { path: '', component: ListOfDoctorsComponent },
          { path: 'new', component: AddDoctorComponent },
          { path: ':id', component: DoctorsComponent },
        ],
      },
      { path: 'location', component: LocationBySearchComponent },
      { path: 'appointments', component: BookingAppointmentComponent },

      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
