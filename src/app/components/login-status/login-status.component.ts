import { Component, Inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent {

  isAuthenticated: boolean = false;
  userFullName: string = '';
  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService
    , @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }


  ngOnInit():void {
    this.oktaAuthService.authState$.subscribe(
      res => {
        this.isAuthenticated = res.isAuthenticated
        this.getUserDetails();
      }
    )
  }
  getUserDetails() {
    if (this.oktaAuth.isAuthenticated) {
      this.oktaAuth.getUser().then(user => {
        this.userFullName = user.name as string;

        const email = user.email;

        this.storage.setItem('userEmail', JSON.stringify(email));
      })
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }
}
