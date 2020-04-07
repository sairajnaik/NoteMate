import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiServer = 'http://localhost:4000';
  private observeActiveNote = new BehaviorSubject<any>('');
  public activeNote = this.observeActiveNote.asObservable();

  constructor(private httpClient: HttpClient) {}

  // Add new note
  public addNewNote(note): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/add-new-note', note)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Get All the notes
  public getAllNotes(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/get-all-notes')
    .pipe(
      catchError(this.errorHandler)
    );
  }

 // Delete a note
 public deleteNote(noteId) {
   return this.httpClient.delete<any>(this.apiServer + '/delete/' + noteId)
    .pipe(
      catchError(this.errorHandler)
    );
 }
// Update Note
public updateNote(note) {
  return this.httpClient.put<any>(this.apiServer + '/update', note)
    .pipe(
      catchError(this.errorHandler)
    );
}
  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

 // set Active Note
 public setActiveNote(note: any) {
  this.observeActiveNote.next(note);
 }


}
