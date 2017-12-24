import { ProjectService } from './services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatExpansionModule, MatListModule } from '@angular/material';
import {MatInputModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {MatDialogModule} from '@angular/material';
import { TaskPublisherComponent } from './components/task-publisher/task-publisher.component';
import { AuthGuard } from './utils/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './services/user.service';
import {MatCardModule} from '@angular/material/card';
import { TaskService } from './services/task.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpProgressService, ProgressInterceptor } from './services/http-progress.service';
import { TaskResolver } from './utils/TaskResolver.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { MySharedModule } from './components/shared-module/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [
    AppComponent,
    TaskPublisherComponent,
    HeaderComponent,
    UserPanelComponent
  ],
  imports: [
    NgZorroAntdModule.forRoot(),
    MatProgressBarModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    UserService,
    AuthGuard,
    TaskService,
    ProjectService,
    HttpProgressService,
    TaskResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressInterceptor,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
