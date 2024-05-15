import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListOfDoctorsComponent } from "./components/list-of-doctors/list-of-doctors.component";
import { HeaderComponent } from './components/header/header.component';
// import{Brow}
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,CommonModule,ListOfDoctorsComponent,HeaderComponent]
})
export class AppComponent {
  title = 'list-of-doctors';
}
