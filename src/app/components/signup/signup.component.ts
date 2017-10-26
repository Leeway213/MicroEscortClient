import { UserService } from '../../services/user.service';
import { isUsernameExistsValidator } from './utils/UserValidator';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatFormField } from '@angular/material';
import { emailValidator } from './utils/EmailValidator';

const USERNAME_REGEX = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
const PASS_REGEX = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isUserExists: boolean;
  usernameValidating: boolean;
  networkFailed: boolean;

  signupForm: FormGroup;

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(USERNAME_REGEX)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(PASS_REGEX)
  ]);

  emailFormControl = new FormControl('', [emailValidator()]);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
      email: this.emailFormControl
    });
  }

  ngOnInit() {
    console.log(this.userService.role);
  }

  /**
   * username改变后，验证是否存在
   * @param e
   */
  async onUsernameChanged(e: any) {
    if (this.usernameFormControl.invalid) {
      return;
    }
    this.usernameValidating = true;
    try {
      const result = await this.userService.validateUsername(e.srcElement.value);
      if (result && result.code === 1) {
          this.usernameFormControl.setErrors({
            isUserExists: true
          });
      }
    } catch (err) {
      console.log(err);
      this.usernameFormControl.setErrors({
        'networkFailure': { value: true }
      });
    } finally {
      this.usernameValidating = false;
    }
  }

  async signup() {
    if (this.signupForm.valid) {
      const result = await this.userService.signup(JSON.stringify(this.signupForm.value));
      console.log(result);
    } else {
    }
  }
}
