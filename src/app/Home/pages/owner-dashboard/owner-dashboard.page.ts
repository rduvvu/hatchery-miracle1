import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.page.html',
  styleUrls: ['./owner-dashboard.page.scss'],
  standalone: false
})
export class OwnerDashboardPage implements OnInit {
   activeTab: 'available' | 'checkedIn' | 'completed' = 'available';
  drivers = [
    { name: 'Sai', email: 'sai@gmail.com', license: '6764334', status: 'Available' },

  ];

  checkedInDrivers = [{ name: 'Kartik', email: 'kartik@gmail.com', license: '647654854959', status: 'Checkin' },
    { name: 'nistala', email: 'nistala@gmail.com', license: '6747845676', status: 'Checkin' },];
  completedDrivers = [];
  constructor() { }

  ngOnInit() {
  }
  get availableDrivers() {
    return this.drivers.filter(d => d.status === 'Available');
  }
}
