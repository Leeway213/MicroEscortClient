import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileRoutingModule } from './user-profile.routing';
import { MySharedModule } from '../shared-module/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { CashRecordComponent } from './cash-record/cash-record.component';
import { UpdateNicknameComponent } from './modal-components/update-nickname/update-nickname.component';
import { UpdateEmailComponent } from './modal-components/update-email/update-email.component';
import { UserInfoService } from './utils/user-info.service';
import { NzFormItemDirective } from 'ng-zorro-antd';
import { UpdatePhoneComponent } from './modal-components/update-phone/update-phone.component';
import { UpdatePasswordComponent } from './modal-components/update-password/update-password.component';
import { UpdateIdentificationComponent } from './modal-components/update-identification/update-identification.component';

@NgModule({
  imports: [
    MySharedModule,
    ProfileRoutingModule,
    MatTabsModule
  ],
  declarations: [
    UserProfileComponent, 
    OverviewComponent, 
    CashOutComponent, 
    CashRecordComponent, 
    UpdateNicknameComponent, UpdateEmailComponent, UpdatePhoneComponent, UpdatePasswordComponent, UpdateIdentificationComponent],
  providers: [
    DatePipe,
    UserInfoService,
    NzFormItemDirective
  ]
})
export class UserProfileModule { }
