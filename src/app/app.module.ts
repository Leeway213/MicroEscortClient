import { StringToToolTypePipe } from './components/mind-tool/utils/StringToToolType';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MindToolComponent } from './components/mind-tool/mind-tool.component';

@NgModule({
  declarations: [
    AppComponent,
    MindToolComponent,
    StringToToolTypePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
