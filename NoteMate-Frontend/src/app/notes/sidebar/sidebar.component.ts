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
  public  notes: any;
  public  activeNote: any;

  constructor(private notesService: NotesService) { }

  public getAllNotes() {
    this.notesService.getAllNotes().pipe(takeUntil(this.ngUnsubscribe)).subscribe( result => {
      if (result && result.notes && result.notes) {
        this.notes = result.notes;
        this.openNote(this.notes[0]);
      }
    });
  }

   // Get the newly added note data.
  private getNewNote() {
    this.notesService.newNote
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(note => {
      if (note) {
        this.addNoteToList(note);
      }
    });
  }

  private geDeletedNoteId() {
    this.notesService.deletedNote
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe( deletedId => {
      if (deletedId) {
        const atIndex = this.notes.findIndex(note => note.id === deletedId);
        if (atIndex > -1) {
          this.notes.splice(atIndex, 1);
          if (this.notes.length && ((this.notes.length - 1) < atIndex )) {
            this.openNote(this.notes[atIndex - 1]);
          }
          if (this.notes.length && ((this.notes.length - 1) >= atIndex )) {
            this.openNote(this.notes[atIndex]);
          }

          if (!this.notes.length) {
            this.activeNote = null;
            this.notesService.setActiveNote(null);
          }
        }
      }
    });
  }

  // Add note to sidebar list
  private addNoteToList(note) {
    this.notes.splice(0, 0, note);
    this.openNote(this.notes[0]);
  }
  // on click open note
  public openNote(note) {
    console.log('activeNote', note);
    this.activeNote = note;
    this.notesService.setActiveNote(this.activeNote);
  }

  ngOnInit(): void {
    this.getAllNotes();
    this.getNewNote();
    this.geDeletedNoteId();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
