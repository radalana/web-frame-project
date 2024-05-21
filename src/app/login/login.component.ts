import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  public loginForm = new FormGroup( {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  }
  )

  public validateLogin() {
    const inputEmail = this.loginForm.get(['email'])?.value;
    const inputPassword = this.loginForm.get(['password'])?.value;
    const result = (inputEmail === 'test@test.at') && (inputPassword === '12345678');
    if (result === true) {
      console.log('Login successful.');
    }else {
      console.log('Login failed.');
    }
  }
}