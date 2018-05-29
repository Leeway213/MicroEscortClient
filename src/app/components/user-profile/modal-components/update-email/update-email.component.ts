import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../utils/user-info.service';
import { setInterval, clearInterval } from 'timers';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseModalComponent } from '../BaseModalComponent';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent extends BaseModalComponent implements OnInit {


  get email() {
    return this.getFormControl('email').value;
  }

  get verCode() {
    return this.getFormControl('verCode').value;
  }

  verButtonContent = "获取验证码";

  constructor(private userInfoService: UserInfoService, private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      verCode: [null, [Validators.minLength(6), Validators.maxLength(6), Validators.required]]
    });
  }

  getVerCode(event: MouseEvent) {
    if (this.getFormControl('email').invalid) {
      return;
    }
    (event.srcElement as HTMLButtonElement).disabled = true;

    // TODO: get ver code

    let tick = 60;
    this.verButtonContent = `(${tick})重新获取`
    let timer = setInterval(() => {
      tick--;
      this.verButtonContent = `(${tick})重新获取`

      if (tick === 0) {
        this.verButtonContent = "重新获取";
        (event.srcElement as HTMLButtonElement).disabled = false;
        clearInterval(timer);
      }
    }, 1000);
  }

  update = (): boolean => {
    return false;
  }

}
