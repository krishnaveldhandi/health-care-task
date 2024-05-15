import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ListOfDoctorsComponent } from './components/list-of-doctors/list-of-doctors.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

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
      { path: 'doctors', component: ListOfDoctorsComponent },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
