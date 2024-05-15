import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ListOfDoctorsService } from '../list-of-doctors.service';
import { CommonModule } from '@angular/common';
import { appConfig } from '../app.config';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export interface Doctors {
  id: string;
  doctorName: string;
  specialization: string;
  location: string;
}

@Component({
  selector: 'list-of-doctors',
  standalone: true,
  imports: [MatTableModule,  MatSortModule, MatPaginatorModule,MatFormFieldModule,MatInputModule, CommonModule],
  templateUrl: './list-of-doctors.component.html',
  styleUrl: './list-of-doctors.component.scss'
})

export class ListOfDoctorsComponent implements AfterViewInit {

  
  
  displayedColumns: string[] = ['id', 'doctorName', 'specialization', 'location'];
  dataSource: MatTableDataSource<Doctors>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listOfDoctorsService:ListOfDoctorsService){
    this.dataSource = new MatTableDataSource<Doctors>();
  }


  ngAfterViewInit() {
  this.getAllDoctors();
  }

  getAllDoctors():void{
    this.listOfDoctorsService.getAllDoctors().subscribe(doctors =>{
      this.dataSource.data = doctors;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
