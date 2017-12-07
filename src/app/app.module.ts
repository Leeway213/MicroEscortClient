import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatExpansionModule, MatListModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { MindToolComponent } from './components/mind-tool/mind-tool.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {MatDialogModule} from '@angular/material';
import { CovalentLoadingModule } from '@covalent/core';
import { TaskPublisherComponent } from './components/task-publisher/task-publisher.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthGuard } from './utils/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './services/user.service';
import {MatCardModule} from '@angular/material/card';
import { TaskService } from './services/task.service';
import { TaskResolver } from './utils/TaskResolver.guard';
import { TaskSubmitComponent } from './components/task-submit/task-submit.component';
import { DoTaskComponent } from './components/do-task/do-task.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpProgressService, ProgressInterceptor } from './services/http-progress.service';
import { LabelListComponent } from './components/label-list/label-list.component';
import { ToolSwitchDirective } from './directives/tool-switch.directive';
import { BoundingBoxComponent } from './components/label-tools/image-annotation/bounding-box/bounding-box.component';
import { PolygonComponent } from './components/label-tools/image-annotation/polygon/polygon.component';
import { PointsToStringPipe } from './components/label-tools/image-annotation/polygon/utils/point-to-string.pipe';
import { VerifyPanelComponent } from './components/label-tools/verify-panel/verify-panel.component';
import {MatRadioModule} from '@angular/material/radio';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { IntroductionViewerComponent } from './components/label-tools/introduction-viewer/introduction-viewer.component';
import { FilterPipe } from './utils/filter.pipe';


@NgModule({
  declarations: [
    PointsToStringPipe,
    AppComponent,
    MindToolComponent,
    LoginComponent,
    SignupComponent,
    TaskPublisherComponent,
    TasksComponent,
    HeaderComponent,
    TaskSubmitComponent,
    DoTaskComponent,
    QuizResultComponent,
    LabelListComponent,
    ToolSwitchDirective,
    BoundingBoxComponent,
    PolygonComponent,
    VerifyPanelComponent,
    IntroductionViewerComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatRadioModule,
    CovalentMarkdownModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CovalentLoadingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    UserService,
    AuthGuard,
    TaskResolver,
    TaskService,
    ProjectService,
    HttpProgressService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressInterceptor,
      multi: true
    }
  ],
  entryComponents: [BoundingBoxComponent, PolygonComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
