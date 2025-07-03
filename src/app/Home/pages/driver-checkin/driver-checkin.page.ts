import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-checkin',
  templateUrl: './driver-checkin.page.html',
   standalone: false
})
export class DriverCheckinPage {
  searchTerm: string = '';
  drivers = [
    { name: 'Sai', email: 'sai@gmail.com', phone: '987697777', license: '6764334', status: 'Available' },
    { name: 'Kartik', email: 'kartik@gmail.com', phone: '6576587569', license: '647654854959', status: 'Available' }
  ];

  filteredDrivers = [...this.drivers];

  filterDrivers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredDrivers = this.drivers.filter(driver =>
      driver.name.toLowerCase().includes(term) ||
      driver.email.toLowerCase().includes(term) ||
      driver.license.includes(term)
    );
  }
}
