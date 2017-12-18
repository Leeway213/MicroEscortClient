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

@NgModule({
  imports: [
    CovalentMarkdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTooltipModule,
    MatButtonToggleModule,
    CommonModule
  ],
  declarations: [
    BoundingBoxComponent,
    PolygonComponent,
    IntroductionViewerComponent,
    VerifyPanelComponent,
    PointsToStringPipe
  ],
  exports: [
    BoundingBoxComponent,
    PolygonComponent,
    IntroductionViewerComponent,
    VerifyPanelComponent
  ]
})
export class LabelToolsModule { }
