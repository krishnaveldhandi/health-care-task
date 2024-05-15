import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HeaderComponent },
  { path: 'doctors', component: ListOfDoctorsComponent },
];
