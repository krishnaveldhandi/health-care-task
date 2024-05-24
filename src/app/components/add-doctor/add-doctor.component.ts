import { Component } from '@angular/core';
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

@Component({
  selector: 'add-doctor',
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
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss',
})
export class AddDoctorComponent {
  doctorForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private addDoctorService: AddDoctorService
  ) {
    this.doctorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['', Validators.required],
      }),
      specializations: this.fb.array([]),
    });
    this.addSpecialization();
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      this.addDoctorService.addDoctor(this.doctorForm.value).subscribe(
        (response) => {
          console.log('Doctor added successfully', response);
          this.disableForm();
          this.isSubmitted = true;
        },
        (error) => {
          console.error('Error adding doctor', error);
        }
      );
    }
  }

  disableForm() {
    this.doctorForm.disable(); // Disable the entire form
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
      name: ['', Validators.required],
      experience: ['', Validators.required],
    });
    this.specializations.push(specializationFrom);
  }

  deleteSpecialization(specializationIndex: number) {
    this.specializations.removeAt(specializationIndex);
  }
}
