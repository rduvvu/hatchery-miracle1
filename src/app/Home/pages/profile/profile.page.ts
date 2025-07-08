import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  user = {
    fullName: 'Sairaj Kumar',
    mobile: '+91 9876543210',
    email: 'sairaj@example.com'
  };
  constructor( private router: Router) { }

  ngOnInit() {
  }

   logout() {
    this.router.navigate(['/owner-login']);
    sessionStorage.clear();
  }

}
