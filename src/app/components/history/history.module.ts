import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material';
import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history.routing';
import { MySharedModule } from '../shared-module/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    HistoryRoutingModule,
    MySharedModule
  ],
  declarations: [HistoryComponent]
})
export class HistoryModule { }
