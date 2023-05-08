import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  server_address = 'http://localhost:5000';

  authtoken: any;
  user: any;
  role: any;
  fio: any;
  id: any;
  email: any;
  image: any;
  classA: any;
  public showNotificationBadge = true;
  public showNotificationRequets = true;
  constructor(private http: HttpClient) {}

  register(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(
      `${this.server_address}/api/users/register`,
      user,
      {
        headers,
      }
    );
  }

  login(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(`${this.server_address}/api/users/login`, user, {
      headers,
    });
  }

  storeUserData(
    token: any,
    user: any,
    role: any,
    email: any,
    fio: any,
    id: any,
    image: any,
    classA: any
  ) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('id', user.id);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', user.role);
    localStorage.setItem('fio', user.fio);
    localStorage.setItem('email', user.email);
    localStorage.setItem('image', user.image);
    localStorage.setItem('classA', user.classA);
    this.id = id;
    this.authtoken = token;
    this.user = user;
    this.role = role;
    this.fio = fio;
    this.email = email;
    this.image = image;
    this.classA = classA;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authtoken = token;
  }

  loggedIn() {
    return !!localStorage.getItem('id_token');
  }

  getToken(): string {
    const token = localStorage.getItem('id_token');
    return token ? token : '';
  }

  Librarian() {
    const role = localStorage.getItem('role');
    if ('библиотекарь' == role) {
      return true;
    }
    return false;
  }

  Member() {
    const role = localStorage.getItem('role');
    if ('учащийся' == role) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.showNotificationBadge = true;
    this.showNotificationRequets = true;
  }
}
