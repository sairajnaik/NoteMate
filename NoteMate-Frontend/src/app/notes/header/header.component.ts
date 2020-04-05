import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchNote: '';
  constructor() { }

  public addNewNote() {
    console.log('Add new note');
  }

  public deleteNote() {
    console.log('delete note');
  }

  ngOnInit(): void {
  }

}
