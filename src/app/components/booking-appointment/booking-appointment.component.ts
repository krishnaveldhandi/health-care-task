import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentService } from '../../appointment.service';
// import { CoreService } from './core/core.service';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { CoreService } from '../core/core.service';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-booking-appointment',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    DatePipe,
    MatTooltipModule,
  ],
  templateUrl: './booking-appointment.component.html',
  styleUrl: './booking-appointment.component.scss',
})
export class BookingAppointmentComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'patientName',
    'DoctorName',
    'chooseADate',
    'time',
    'location',
    'gender',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _appointmentService: AppointmentService,
    private _coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.getAppointmentList();
  }

  openAppointmentsForm() {
    const dialogRef = this._dialog.open(AppointmentsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAppointmentList();
        }
      },
    });
  }
  getAppointmentList() {
    this._appointmentService.getAppointmentList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteAppointment(id: number) {
    if (confirm('Are you sure you Want to Delete Appointment!'))
      this._appointmentService.deleteAppointment(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Appointment Deleted!', 'done');
          this.getAppointmentList();
        },
        error: console.log,
      });
  }

  openedItForm(data: any) {
    const dialogRef = this._dialog.open(AppointmentsComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAppointmentList();
        }
      },
    });
  }
}
