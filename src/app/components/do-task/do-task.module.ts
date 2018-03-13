import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoTaskComponent } from './do-task/do-task.component';
import { MindToolComponent } from './mind-tool/mind-tool.component';
import { TdMarkdownComponent } from '@covalent/markdown/markdown.component';
import { TaskSubmitComponent } from './task-submit/task-submit.component';
import { MatButtonModule, MatListModule, MatExpansionModule, MatButtonToggleModule } from '@angular/material';
import { LabelToolsModule } from '../label-tools/label-tools.module';
import { LabelListComponent } from './label-list/label-list.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { DoTaskRoutingModule } from './do-task.routing';
import { BoundingBoxComponent } from '../label-tools/image-annotation/bounding-box/bounding-box.component';
import { PolygonComponent } from '../label-tools/image-annotation/polygon/polygon.component';
import { ToolSwitchDirective } from './directives/tool-switch.directive';
import { PointComponent } from '../label-tools/image-annotation/point/point.component';
import { TaskSetResolver } from './utils/TaskSetResolver.guard';
import {ChangeZoomDirective} from './directives/changeZoom.directive';
import { PageGuard } from './utils/page.guard';

@NgModule({
  imports: [
    LabelToolsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatExpansionModule,
    DoTaskRoutingModule,
    CommonModule
  ],
  declarations: [
    ToolSwitchDirective,
    QuizResultComponent,
    LabelListComponent,
    DoTaskComponent,
    MindToolComponent,
    TaskSubmitComponent,
    ChangeZoomDirective
  ],
  providers: [
    TaskSetResolver,
    PageGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    BoundingBoxComponent,
    PolygonComponent,
    PointComponent
  ]
})
export class DoTaskModule { }
