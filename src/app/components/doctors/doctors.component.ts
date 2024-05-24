import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AddDoctorService } from '../add-doctor.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'doctors',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
})
export class DoctorsComponent implements OnInit {
  doctorForm: FormGroup;
  isSubmitted: boolean = false;
  id: string | null | undefined;
  isView: boolean = false;

  constructor(
    private fb: FormBuilder,
    private addDoctorService: AddDoctorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.fb.group({
        id: [''],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['', Validators.required],
      }),
      specializations: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.addDoctorService.getDoctor(Number.parseInt(this.id)).subscribe({
          next: (data) => {
            if (data.code == 200) {
              if (data.data?.specializations) {
                (data.data.specializations as any[]).forEach((x) => {
                  this.addSpecialization();
                });
              }
              this.doctorForm.patchValue(data.data);
              if (this.isView) this.doctorForm.disable();
            }
            this.activatedRoute.queryParamMap.subscribe((paramMap) => {
              this.isView = paramMap.get('a') != 'edit';
              if (this.isView) {
                this.doctorForm.disable();
              } else {
                this.doctorForm.enable();
              }
            });
          },
        });
      }
    });
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      this.addDoctorService.addDoctor(this.doctorForm.value).subscribe(
        (response) => {
          console.log('Doctor added successfully', response);
          if (response.code == 200) {
            this.navigateToView();
          }
        },
        (error) => {
          console.error('Error adding doctor', error);
        }
      );
    }
  }

  disableForm() {
    this.doctorForm.disable();
  }

  public getSpecializations() {
    return (this.doctorForm.get('specializations') as FormArray)
      .controls as FormGroup[];
  }

  get specializations() {
    return this.doctorForm.controls['specializations'] as FormArray;
  }

  addSpecialization() {
    const specializationFrom = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      experience: ['', Validators.required],
    });
    this.specializations.push(specializationFrom);
  }

  deleteSpecialization(specializationIndex: number) {
    this.specializations.removeAt(specializationIndex);
  }

  navigateToEdit() {
    this.router.navigate(['/doctors/' + this.id], {
      queryParams: { a: 'edit' },
    });
  }

  navigateToView() {
    this.router.navigate(['/doctors/' + this.id], {
      queryParams: { a: 'view' },
    });
  }

  delete() {
    if (this.id)
      this.addDoctorService.deleteDoctor(Number.parseInt(this.id)).subscribe({
        next: (data) => {
          if (data.code == 200) {
            this.router.navigate(['/doctors']);
          }
        },
      });
  }
}
