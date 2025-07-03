import { Component, OnInit } from '@angular/core';

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
  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }
   login() {
    if (this.username && this.password ) {
      this.presentToast("Login Successful!", 'success')
      this.router.navigate(['/tabs']);
    } else {
      alert('Invalid credentials');
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
