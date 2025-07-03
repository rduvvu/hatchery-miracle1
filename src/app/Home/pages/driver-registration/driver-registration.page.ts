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
  // Only proceed if form is valid
  if (this.driver.fullName && this.driver.ownerName && this.driver.phone && this.driver.truckType && this.driver.licenseNumber) {
    console.log('Registering driver:', this.driver);
    // your API call or logic here
  }
}

}
