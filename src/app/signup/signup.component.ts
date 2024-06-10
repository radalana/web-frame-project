import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';

export const confirmPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const result = (control.value.password === control.value.password_confirm) ? null : {mismatch: true};
  return result;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  constructor(private backendService: BackendService) {}
  public signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirm: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.pattern('^\\d*')]),
    company: new FormControl('FH Technikum Wien'),
    address: new FormControl(''),
    city: new FormControl('',[Validators.pattern("[a-zA-Z ]*")]),
  },
  confirmPassword
  );
  onSubmit(form: FormGroup) {
    console.log('in onSubit form.value: ' + form.value);
    this.backendService.signUp(form.value.email, form.value.password, form.value.company, form.value.address, form.value.city, form.value.postal_code);
    //this.router.navigate(['/']);
  }

  
}
