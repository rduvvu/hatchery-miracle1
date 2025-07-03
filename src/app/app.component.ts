import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showTabs = true;
  path: any = window.location.href;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event:any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.path = event.urlAfterRedirects;
      });
    // this.platform.ready().then(() => {
    //   // Set keyboard mode to resize the body, so content moves up
    //   Keyboard.setResizeMode({ mode: KeyboardResize.Body });
    // });
  }
}
