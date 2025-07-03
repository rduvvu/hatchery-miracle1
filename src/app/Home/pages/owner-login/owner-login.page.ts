import { Component, OnInit } from '@angular/core';

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
  constructor(private router: Router) { }

  ngOnInit() {
  }
   login() {
    if (this.username === 'owner' && this.password === 'hatchery123') {
      this.router.navigate(['/tabs']);
    } else {
      alert('Invalid credentials');
    }
  }

}
