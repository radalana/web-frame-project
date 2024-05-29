import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;

  //damit Daten in alle Requesten in json format verschikt werden (kann man auch direct in request)
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  //construct injection
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: FormGroup) {
    console.log(form.value);
    //{message: string} erwartet response from server als objekt mit message property
    this.http.post<{message: string, redirectUrl: string}>('http://localhost:3000/sessions', form.value, this.httpOptions)
      //feedback von server zu bekommen
      .subscribe((response) => {
          if (response.redirectUrl) {
            this.router.navigate([response.redirectUrl]);
          }
          console.log(response.message);
      });
  }

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