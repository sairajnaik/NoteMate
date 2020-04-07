import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  public notes: any;
  public activeNote: any;

  constructor(private notesService: NotesService) { }

  public getAllNotes() {
    this.notesService.getAllNotes().pipe(takeUntil(this.ngUnsubscribe)).subscribe( result => {
      this.notes = result.notes;
    });
  }

  public openNote(note) {
    this.activeNote = note;
    this.notesService.setActiveNote(this.activeNote);
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
