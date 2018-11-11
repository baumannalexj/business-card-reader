import { Component } from '@angular/core';
import {AuthService} from "./login/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'business-card-reader';

  constructor(private authService : AuthService){}

  logout() {
    this.authService.signOut();
  }
}
