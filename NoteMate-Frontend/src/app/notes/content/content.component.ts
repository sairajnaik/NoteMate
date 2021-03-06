import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  public currentNote: any;
  private modelChanged = new Subject<string>();

  constructor(private notesService: NotesService) {

    this.modelChanged.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.updateNote();
    });
   }

 // Get the selected note data.
  private getActiveNote() {
    this.notesService.activeNote
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(note => {
      this.currentNote = note;
    });
  }

  private updateNote() {
    this.notesService.updateNote(this.currentNote).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log(res);
    });
  }

  public userIsTyping() {
    this.currentNote.date = new Date();
    this.modelChanged.next();
  }

  ngOnInit(): void {
    this.getActiveNote();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
