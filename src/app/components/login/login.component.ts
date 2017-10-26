import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


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
    Validators.required
  ]);

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      username: this.usernameFormControl,
      password: this.passwordFormControl
    });
  }

  ngOnInit() {
    console.log(this.route.pathFromRoot.toString());
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        const result = await this.userService.login(this.loginForm.value);
      } catch (err) {
      }
    }
  }

}


