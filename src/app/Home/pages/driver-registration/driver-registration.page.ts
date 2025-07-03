import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.page.html',
  styleUrls: ['./driver-registration.page.scss'],
  standalone: false
})
export class DriverRegistrationPage implements OnInit {
 driver = {
    fullName: '',
    ownerName: '',
    phone: '',
    truckType: '',
    licenseNumber: '',
  };
  constructor() { }

  ngOnInit() {
  }
    registerDriver() {
    console.log('Driver registered:', this.driver);
    // TODO: Send data to backend
  }

}
