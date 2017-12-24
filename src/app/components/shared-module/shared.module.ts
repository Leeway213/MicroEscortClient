import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftNavPanelComponent } from './left-nav-panel/left-nav-panel.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    NgZorroAntdModule,
    CommonModule,
    FormsModule
  ],
  declarations: [LeftNavPanelComponent],
  exports: [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    LeftNavPanelComponent
  ]
})
export class MySharedModule { }
