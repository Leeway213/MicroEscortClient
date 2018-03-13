import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoundingBoxComponent } from './image-annotation/bounding-box/bounding-box.component';
import { PolygonComponent } from './image-annotation/polygon/polygon.component';
import { IntroductionViewerComponent } from './introduction-viewer/introduction-viewer.component';
import { VerifyPanelComponent } from './verify-panel/verify-panel.component';
import { MatTooltipModule } from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { PointsToStringPipe } from './image-annotation/polygon/utils/point-to-string.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { MySharedModule } from '../shared-module/shared.module';
import { PointComponent } from './image-annotation/point/point.component';
import { LineComponent } from './image-annotation/line/line.component';
import { AudioTranscriptComponent } from './audio/audio-transcript/audio-transcript.component';
import { TransformTimePipe } from './pipes/transformTime.pipe';

@NgModule({
  imports: [
    CovalentMarkdownModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MySharedModule
  ],
  declarations: [
    BoundingBoxComponent,
    PolygonComponent,
    IntroductionViewerComponent,
    VerifyPanelComponent,
    PointsToStringPipe,
    PointComponent,
    LineComponent,
    AudioTranscriptComponent,
    TransformTimePipe
  ],
  exports: [
    BoundingBoxComponent,
    PolygonComponent,
    IntroductionViewerComponent,
    VerifyPanelComponent,
    AudioTranscriptComponent,
    TransformTimePipe
  ]
})
export class LabelToolsModule { }
