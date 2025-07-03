import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

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
  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }
registerDriver() {
  // Only proceed if form is valid
  if (this.driver.fullName && this.driver.ownerName && this.driver.phone && this.driver.truckType && this.driver.licenseNumber) {
     this.presentToast('Driver Registration successful!', 'success');
    console.log('Registering driver:', this.driver);
    // your API call or logic here
  }
}

async presentToast(message: string, color: string = 'success') {
  const toast = await this.toastController.create({
    message,
    duration: 3000,           // visible for 3 seconds
    color,                    // 'success', 'danger', 'warning', etc.
    position: 'bottom'
  });
  await toast.present();
}

}
