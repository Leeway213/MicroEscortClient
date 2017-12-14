import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProfileRoutingModule } from './user-profile.routing';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTabsModule
  ],
  declarations: [ProfileComponent]
})
export class UserProfileModule { }
