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

  public addNewNote() {
    const newNote = { date: Date.now(), content: '' };
    this.notesService.addNewNote(newNote).pipe(takeUntil(this.ngUnsubscribe)).subscribe( result => {
      this.notes = result.notes;
    });
  }

  public deleteNote() {
    if (this.activeNote && this.activeNote.length) {
      this.notesService.deleteNote(this.activeNote.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe( result => {
        this.activeNote = null;
        this.notes = result.notes;
      });
    }
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
