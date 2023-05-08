import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from 'dom7';
import { Observable } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserServies {
  // categories: Category[] = [];

  private categoriesUrl = '/api/users/';
  server_address = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  getcurrentUser(id: any) {
    return this.http.get(`${this.server_address}/user/` + id);
  }

  // update(id: string, image: File) {
  //   const fd = new FormData();

  //   fd.append('image', image, image.name);

  //   return this.http.patch(this.categoriesUrl + `${id}`, fd);
  // }

  getStudents() {
    return this.http.get(`${this.server_address}/allStudent`);
  }

  updateUserPhoto(id: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo, photo.name);
    return this.http.patch(`${this.server_address}/${id}`, formData);
  }

  updateUser(id: string, user: User) {
    return this.http.put(`${this.server_address}/updateUser/${id}`, user);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.server_address}/delete/` + id);
  }
}
