import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, ContentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class NotesModule { }
