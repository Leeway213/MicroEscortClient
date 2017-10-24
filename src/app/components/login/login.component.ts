import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

const PASS_REGEX = /[\da-zA-Z]*\d+[a-zA-Z]+[\da-zA-Z]*/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(PASS_REGEX)
  ]);

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: this.usernameFormControl,
      password: this.passwordFormControl
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {

    }
  }

}
