import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Donor } from '../../core/models/donor.model';

@Component({
  selector: 'app-donor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './donor-form.component.html',
  styleUrls: ['./donor-form.component.scss']
})
export class DonorFormComponent implements OnInit {
  donorForm!: FormGroup;
  isEditMode = false;
  bloodGroups = [
    { value: 'A_POS', label: 'A+' },
    { value: 'A_NEG', label: 'A-' },
    { value: 'B_POS', label: 'B+' },
    { value: 'B_NEG', label: 'B-' },
    { value: 'AB_POS', label: 'AB+' },
    { value: 'AB_NEG', label: 'AB-' },
    { value: 'O_POS', label: 'O+' },
    { value: 'O_NEG', label: 'O-' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DonorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit'; donor?: Donor }
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.data.mode === 'edit';
    const donor = this.data.donor;

    this.donorForm = this.fb.group({
      userId: [{ value: donor ? donor.user.id : '', disabled: this.isEditMode }, this.isEditMode ? [] : [Validators.required]],
      bloodGroup: [donor ? donor.bloodGroup : '', Validators.required],
      age: [donor ? donor.age : '', [Validators.required, Validators.min(18)]],
      phone: [donor ? donor.phone : '', Validators.required],
      lastDonationDate: [donor && donor.lastDonationDate ? new Date(donor.lastDonationDate) : null]
    });
  }

  onSubmit(): void {
    if (this.donorForm.invalid) {
      return;
    }

    const formVal = this.donorForm.getRawValue();
    
    let formattedDate = null;
    if (formVal.lastDonationDate) {
      const date = new Date(formVal.lastDonationDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`;
    }

    const payload = {
      userId: formVal.userId,
      donor: {
        bloodGroup: formVal.bloodGroup,
        age: formVal.age,
        phone: formVal.phone,
        lastDonationDate: formattedDate
      }
    };

    this.dialogRef.close(payload);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
