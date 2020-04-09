import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public  searchNote: string;
  private ngUnsubscribe = new Subject();
  public  activeNote: any;

  constructor(private notesService: NotesService) { }

  public addNewNote() {
    const newNote = { date: Date.now(), content: '' };
    this.notesService.addNewNote(newNote).pipe(takeUntil(this.ngUnsubscribe)).subscribe( result => {
      this.notesService.setNewNote(result);
    });
  }

  public deleteNote() {
    if (this.activeNote && this.activeNote.id) {
      this.notesService.deleteNote(this.activeNote.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe( result => {
        if (result) {
          const noteId: string = result.toString();
          console.log('received noteID', noteId);
          this.notesService.setDeletedNote(noteId);
        }
      });
    }
  }

  // Get the selected note data.
   private getActiveNote() {
    this.notesService.activeNote
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(note => {
      this.activeNote = note;
    });
  }

  ngOnInit(): void {
    this.getActiveNote();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
