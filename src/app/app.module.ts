import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointsToStringPipe } from './components/mind-tool/utils/PointsToString';
import { StringToToolTypePipe } from './components/mind-tool/utils/StringToToolType';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';

import { AppComponent } from './app.component';
import { MindToolComponent } from './components/mind-tool/mind-tool.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    MindToolComponent,
    StringToToolTypePipe,
    PointsToStringPipe,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
