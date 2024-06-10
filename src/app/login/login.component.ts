import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormControl, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

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
  });

  constructor(private backendService: BackendService, private router: Router) {}
  

  
  onSubmit(form: FormGroup) {
    //console.log(form.value);
    this.backendService.login(form.value.email, form.value.password);
  }
}