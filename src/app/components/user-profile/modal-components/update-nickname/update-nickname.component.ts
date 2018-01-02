import { Component, OnInit, Input } from '@angular/core';
import { UserInfoService } from '../../utils/user-info.service';
import { FormGroup } from '@angular/forms/src/model';
import { BaseModalComponent } from '../BaseModalComponent';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-nickname',
  templateUrl: './update-nickname.component.html',
  styleUrls: ['./update-nickname.component.css']
})
export class UpdateNicknameComponent extends BaseModalComponent implements OnInit {

  notUnique: boolean;

  nickname: string;

  update = async (): Promise<boolean> => {
    console.log("update nickname");
    const res = await this.userInfoService.updateProfile({ nickname: this.nickname });
    if (res.code === 1) {
      return true;
    } else if(res.data && res.msg === "SequelizeUniqueConstraintError") {
      this.notUnique = true;
      return false;
    } else {
      return false;
    }
  }

  constructor(protected userInfoService: UserInfoService, protected fb: FormBuilder) { 
    super();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      nickname: [ null, [ this.notUniqueValidator ]]
    });
  }

  notUniqueValidator() {
    if (this.notUnique) {
      return { notUnique: true, error: true };
    } else {
      return { notUnique: false };
    }
  }

}
