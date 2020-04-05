import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from './notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
