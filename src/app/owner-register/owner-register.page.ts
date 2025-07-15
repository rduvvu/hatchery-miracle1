import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-owner-register',
  templateUrl: './owner-register.page.html',
  styleUrls: ['./owner-register.page.scss'],
  standalone: false
})
export class OwnerRegisterPage implements OnInit {
  ownerRegisterForm!: FormGroup;
vehicleNumbers: string[] = [
  'AP31AB1234',
  'TS09CA4321',
  'KA05MK6789',
  'MH12XY9876',
  'DL3CAF5030'
];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.ownerRegisterForm = this.fb.group({
      ownerName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      vehicleNumber: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  registerOwner() {
    if (this.ownerRegisterForm.valid) {
      const formData = this.ownerRegisterForm.value;
      console.log('Owner Registration Data:', formData);
      // TODO: Send this data to your API
    }
  }

  onInputLimit(event: any, field: string) {
    const value = event.target.value;
    if (value.length > 50) {
      this.ownerRegisterForm.get(field)?.setValue(value.substring(0, 50));
    }
  }

  onPhoneInput(event: any) {
    const input = event.target.value.replace(/\D/g, '');
    this.ownerRegisterForm.get('phoneNumber')?.setValue(input);
  }
}
