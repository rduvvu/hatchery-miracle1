import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { apis } from 'src/app/services/apis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.page.html',
  styleUrls: ['./owner-login.page.scss'],
   standalone: false
})
export class OwnerLoginPage implements OnInit {
  username = '';
  password = '';
  constructor(private router: Router,private apiService: ApiServiceService) { }

  ngOnInit() {
  }
   login() {
    const reqBody = {
      name: this.username,
      password: this.password
    };
    this.apiService.postApi(`${apis.ownerLogin}`, reqBody).subscribe((response) => {
      if (response.success === true) {
        sessionStorage.setItem("userId", response.data.id);
        this.router.navigate(['/tabs']);
      } else {
        alert('Invalid credentials');
      }
    })
  }

}