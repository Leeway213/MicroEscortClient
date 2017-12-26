import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileRoutingModule } from './user-profile.routing';
import { MySharedModule } from '../shared-module/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OverviewComponent } from './overview/overview.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { CashRecordComponent } from './cash-record/cash-record.component';

@NgModule({
  imports: [
    MySharedModule,
    ProfileRoutingModule,
    MatTabsModule
  ],
  declarations: [UserProfileComponent, OverviewComponent, CashOutComponent, CashRecordComponent]
})
export class UserProfileModule { }
