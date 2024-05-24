import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ListOfDoctorsService } from '../../list-of-doctors.service';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { appConfig } from '../../app.config';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export interface Doctors {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: Address;
  specializations: Specialization[];
}

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Specialization {
  id: number;
  name: string;
  experience: number;
}

@Component({
  selector: 'list-of-doctors',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './list-of-doctors.component.html',
  styleUrl: './list-of-doctors.component.scss',
})
export class ListOfDoctorsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    // 'doctorName',
    'firstName',
    'lastName',
    'gender',
    'specialization',
    'location',
    'action',
  ];
  dataSource: MatTableDataSource<Doctors>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private listOfDoctorsService: ListOfDoctorsService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Doctors>();
  }

  ngAfterViewInit() {
    this.getAllDoctors();
  }

  getAllDoctors(): void {
    this.listOfDoctorsService.getAllDoctors().subscribe((doctors) => {
      if ((doctors as any).code != 200) return;
      this.dataSource.data = (doctors as any).data;
      console.log(doctors);

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

  onClick() {
    this.router.navigate(['/new']);
  }

  getSpecializations(data: Doctors) {
    return data.specializations.map((x, i) => x.name).join(', ');
  }

  delete(id: number) {
    console.log(id);

    this.listOfDoctorsService.deleteDoctor(id).subscribe({
      next: (data) => {
        if (data.code == 200) {
          this.getAllDoctors();
        }
      },
    });
  }
}
