import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NzModalSubject } from 'ng-zorro-antd';
import { UpdateNicknameComponent } from '../modal-components/update-nickname/update-nickname.component';
import { UpdateEmailComponent } from '../modal-components/update-email/update-email.component';
import { UpdatePhoneComponent } from '../modal-components/update-phone/update-phone.component';
import { UpdatePasswordComponent } from '../modal-components/update-password/update-password.component';
import { UpdateIdentificationComponent } from '../modal-components/update-identification/update-identification.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @ViewChild("nicknameComponent") nicknameComponent: UpdateNicknameComponent;
  @ViewChild("emailComponent") emailComponent: UpdateEmailComponent;
  @ViewChild("phoneComponent") phoneComponent: UpdatePhoneComponent;
  @ViewChild("passwordComponent") passwordComponent: UpdatePasswordComponent;
  @ViewChild("identificationComponent") identificationComponent: UpdateIdentificationComponent;

  nicknameVisible: boolean = false;
  nicknameConfirmLoading: boolean = false;

  emailVisible: boolean = false;
  emailConfirmLoading: boolean = false;

  phoneVisible: boolean = false;
  phoneConfirmLoading: boolean = false;

  passwordVisible: boolean = false;
  passwordConfirmLoading: boolean = false;

  identificationVisible: boolean = false;
  identificationConfirmLoading: boolean = false;

  constructor(public userService: UserService, private subject: NzModalSubject) { }

  ngOnInit() {
  }

  update = async e => {
    this.nicknameConfirmLoading = this.emailConfirmLoading = this.phoneConfirmLoading = this.passwordConfirmLoading = this.identificationConfirmLoading = true;

    let result = false;
    // TODO: update profile
    console.log(this.userService.profile);
    if (this.nicknameVisible) {
      result = await this.nicknameComponent.update();
    }
    if (this.emailVisible) {
      result = this.emailComponent.update();
    }
    if (this.phoneVisible) {
      result = this.phoneComponent.update();
    }
    if (this.passwordVisible) {
      result = this.passwordComponent.update();
    }
    if (this.identificationVisible) {
      result = this.identificationComponent.update();
    }

    this.nicknameConfirmLoading = this.emailConfirmLoading = this.phoneConfirmLoading = this.passwordConfirmLoading = this.identificationConfirmLoading = false;
    if (result) {
      this.nicknameVisible = this.emailVisible = this.phoneVisible = this.passwordVisible = this.identificationVisible = false;
    }
  }

}
