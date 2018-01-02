import { Component, OnInit, Input } from '@angular/core';
import { UserInfoService } from '../../utils/user-info.service';
import { FormGroup } from '@angular/forms/src/model';
import { BaseModalComponent } from '../BaseModalComponent';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-update-nickname',
  templateUrl: './update-nickname.component.html',
  styleUrls: ['./update-nickname.component.css']
})
export class UpdateNicknameComponent extends BaseModalComponent implements OnInit {

  nickname: string;

  update = async (): Promise<boolean> => {
    const res = await this.userInfoService.updateProfile({ nickname: this.getFormControl('nickname').value });
    if (res.code === 1) {
      return true;
    } else if(res.data && res.msg === "SequelizeUniqueConstraintError") {
      this._message.create("error", "该昵称已被其他人使用");
      return false;
    } else {
      this._message.create("error", "更新昵称失败");
      return false;
    }
  }

  constructor(protected userInfoService: UserInfoService, protected fb: FormBuilder, private _message: NzMessageService) { 
    super();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      nickname: [ null, [  Validators.required ]]
    });
  }

}
