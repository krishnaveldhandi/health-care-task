import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListOfDoctorsComponent } from "./list-of-doctors/list-of-doctors.component";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
// import { CommonModule } from '@angular/common';
// import{Brow}
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ListOfDoctorsComponent,CommonModule]
})
export class AppComponent {
  title = 'list-of-doctors';
}
