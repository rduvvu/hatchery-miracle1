import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { apis } from 'src/app/services/apis';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  truckTypes: string[] = ['Ape Xtra LDX','Bolero Pik-Up 4x2','Bolero Pik-Up ExtraStrong','Bolero Maxitruck Plus','DCM 4-wheeler', 'DCM Toyota HT', 'DCM 909', 'Tata 407 EX', 'Tata 407 Pickup','Tata 407 Gold SFC','Tata 1109 EX','Tata 1120 LPT','Tata Ace Gold'];

   driverRegisterForm!: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder, private apiService: ApiServiceService,private toastController: ToastController) { }

  ngOnInit() {
  }

   initFarmerForm() {
    this.driverRegisterForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      ownerName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      truckType: ['', Validators.required],
      licenseNumber: ['', Validators.required,Validators.pattern(/^[0-9]+$/)],
      vehicleNumber: ['', [
      Validators.required,
      Validators.pattern(/^[A-Z0-9]+$/)
      ]],
    });
  }
  registerDriver() {
    // Only proceed if form is valid
    if (this.driver.fullName && this.driver.ownerName && this.driver.phone && this.driver.truckType && this.driver.licenseNumber) {
      console.log('Registering driver:', this.driver);
      // your API call or logic here
      const reqBody = {
        "driverName": this.driver.fullName,
        "ownerName": this.driver.ownerName,
        "phoneNumber": this.driver.phone,
        "vehicleType": this.driver.truckType,
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
