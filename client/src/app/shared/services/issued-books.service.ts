import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssuedBooksService {
  server_address = 'http://localhost:5000/api/issuedBooks';

  constructor(private http: HttpClient) {}

  //SRVICES ДЛЯ ЧИТЕТЕЛЕЙ

  //взятие книги читателем
  takeBook(book: any) {
    return this.http.post<any>(`${this.server_address}/takebook`, book);
  }

  submittedBooksMember(email: any) {
    return this.http.get(`${this.server_address}/viewsubmittedbooks/` + email);
  }

  issuedBooksMember(email: any) {
    return this.http.get(`${this.server_address}/viewissuedbooks/` + email);
  }

  //SRVICES ДЛЯ БИБЛИОТЕКАРЯ

  //Issue Book By Librarian
  issueBook(item: any) {
    return this.http
      .put(`${this.server_address}/issuebook`, item)
      .subscribe((data) => {
        console.log(data);
      });
  }

  //Книги, ожидающие выдачи
  waitingForIssued() {
    return this.http.get(`${this.server_address}/waitingIssued`);
  }

  waitingForReturned() {
    return this.http.get(`${this.server_address}/waitingReturned`);
  }

  // getBooksOnHand(userId: string): Observable<any[]> {
  //   return this.http.get<any[]>(
  //     `${this.server_address}/${userId}/waitingReturned`
  //   );
  // }

  getBooksOnHand(userId: string, memberEmail: any): Observable<any> {
    return this.http.post(
      `${this.server_address}/${userId}/waitingReturned`,
      memberEmail
    );
  }

  //Delete Returned Books from Issuedbooks DB
  bookReturnedOrCancelRequest(deleteId: any) {
    return this.http.delete(`${this.server_address}/delete/` + deleteId);
  }

  extendBook(id: string) {
    const data = { id: id };
    return this.http.post<any>(`${this.server_address}/extend`, data);
  }
}
