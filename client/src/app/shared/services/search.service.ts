import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private server_address = 'http://localhost:5000/api/search';

  constructor(private http: HttpClient) {}

  search(item: { query: string }) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(
      `${this.server_address}`,
      { query: item.query },
      {
        headers,
      }
    );
  }
}
