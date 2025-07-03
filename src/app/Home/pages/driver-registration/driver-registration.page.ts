import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { apis } from 'src/app/services/apis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.page.html',
  styleUrls: ['./driver-registration.page.scss'],
  standalone: false
})
export class DriverRegistrationPage implements OnInit {
  driver: any = {
    fullName: '',
    ownerName: '',
    phone: '',
    truckType: '',
    licenseNumber: '',
    vehicleNumber: '',
  };
  constructor(private router: Router, private apiService: ApiServiceService,private toastController: ToastController) { }

  ngOnInit() {
  }
  registerDriver() {
    // Only proceed if form is valid
    if (this.driver.fullName && this.driver.ownerName && this.driver.phone && this.driver.truckType && this.driver.licenseNumber) {
      console.log('Registering driver:', this.driver);
      // your API call or logic here
      const reqBody = {
        "fullName": this.driver.fullName,
        "ownerName": this.driver.ownerName,
        "phone": this.driver.phone,
        "truckType": this.driver.truckType,
        "licenseNumber": this.driver.licenseNumber,
        "vehicleNumber": this.driver.vehicleNumber,
      };
      this.apiService.postApi(`${apis.driverRegister}`, reqBody).subscribe((response) => {
        if (response.success === true) {
           this.presentToast('Driver Registration successful!', 'success');
          this.router.navigate(['/tabs']);
          this.driver = {}
        } else {
          alert('Invalid credentials');
        }
      })
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
