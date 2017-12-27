import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongmaoTrainComponent } from './longmao-train/longmao-train.component';
import { CovalentMarkdownModule } from '@covalent/markdown';

@NgModule({
  imports: [
    CovalentMarkdownModule,
    CommonModule
  ],
  declarations: [
    LongmaoTrainComponent
  ],
  exports: [
    LongmaoTrainComponent
  ]
})
export class LongmaoTrainModule { }
