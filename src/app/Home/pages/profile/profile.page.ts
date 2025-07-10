import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  user: any= {}
  constructor( private router: Router) { }

  ngOnInit() {
  }
    ionViewWillEnter() {
  const profile = sessionStorage.getItem('userInfo');
  this.user = profile ? JSON.parse(profile) : this.user;
  console.log( this.user,"21");

  }

   logout() {
    this.router.navigate(['/owner-login']);
    sessionStorage.clear();
  }

}
