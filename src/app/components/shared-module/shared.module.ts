import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftNavPanelComponent } from './left-nav-panel/left-nav-panel.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ToturialComponent } from './toturial/toturial.component';
import { CovalentTextEditorModule } from '@covalent/text-editor';

@NgModule({
  imports: [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CovalentTextEditorModule
  ],
  declarations: [LeftNavPanelComponent,ToturialComponent],
  exports: [
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeftNavPanelComponent,
    ToturialComponent
  ]
})
export class MySharedModule { }
