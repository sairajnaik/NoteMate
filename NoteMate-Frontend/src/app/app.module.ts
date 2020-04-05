import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './config/request.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesModule } from './notes/notes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotesModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
