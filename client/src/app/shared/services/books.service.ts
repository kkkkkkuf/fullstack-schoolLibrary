import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  server_address = 'http://localhost:5000/api/books';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(this.server_address);
  }

  getBook(id: any) {
    return this.http.get(`${this.server_address}/` + id);
  }

  updateBook(id: string, bookData: any) {
    return this.http.put(`${this.server_address}/update/${id}`, bookData);
  }

  deleteBook(id: any) {
    return this.http.delete(`${this.server_address}/delete/` + id);
  }

  postBook(book: any) {
    return this.http.post<any>(`${this.server_address}/create`, book);
  }
}
