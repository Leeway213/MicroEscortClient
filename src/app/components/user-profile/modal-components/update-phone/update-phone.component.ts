import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInfoService } from '../../utils/user-info.service';

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.css']
})
export class UpdatePhoneComponent implements OnInit {

  validateForm: FormGroup;

  get email() {
    return this.getFormControl('phone').value;
  }

  get verCode() {
    return this.getFormControl('verCode').value;
  }

  verButtonContent = "获取验证码";

  constructor(private userInfoService: UserInfoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      phone: [null, [ Validators.required ]],
      verCode: [null, [ Validators.required]]
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getVerCode(event: MouseEvent) {
    if (this.getFormControl('phone').invalid) {
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

  update(): boolean {
    console.log("update phone");
    return false;
  }

}
