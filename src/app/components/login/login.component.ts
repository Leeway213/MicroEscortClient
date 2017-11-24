import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // 登陆成功后跳转的路由
  redirectTo: string;

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
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.loginForm = this.formBuilder.group({
      username: this.usernameFormControl,
      password: this.passwordFormControl
    });
  }

  ngOnInit() {
    if (this.userService.checkAuth()) {
      this.router.navigate(['tasks']);
    }
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        const result = await this.userService.login(this.loginForm.value);
        console.log(this.route);
        if (this.redirectTo) {
          this.router.navigate([this.redirectTo]);
        } else {
          this.router.navigate(['tasks']);
        }
      } catch (err) {
      }
    }
  }

}


