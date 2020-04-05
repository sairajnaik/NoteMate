import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NotesComponent } from './notes.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [NotesComponent, SidebarComponent, HeaderComponent, ContentComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class NotesModule { }
