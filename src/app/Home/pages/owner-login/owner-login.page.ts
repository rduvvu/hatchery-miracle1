import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { apis } from 'src/app/services/apis';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.page.html',
  styleUrls: ['./owner-login.page.scss'],
   standalone: false
})
export class OwnerLoginPage implements OnInit {
  username = '';
  password = '';
  showPassword = true;
  constructor(private router: Router,private apiService: ApiServiceService,private toastController: ToastController) { }

  ngOnInit() {
  }
   login() {
    const reqBody = {
      ownerName: this.username,
      password: this.password
    };
    this.apiService.postApi(`${apis.ownerLogin}`, reqBody).subscribe((response:any) => {
      console.log('Login response:', response);

      if (response.success === true) {
        sessionStorage.setItem("userId", response.userId);
        sessionStorage.setItem("userInfo", JSON.stringify(response));
        this.presentToast("Login successful!","success")
        this.router.navigate(['/tabs']);
      } else {
        alert('Invalid credentials');
      }
    })
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

