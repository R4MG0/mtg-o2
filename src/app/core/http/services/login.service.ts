import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  login(user: User){
    return this.http.post('http://localhost:5000/login', user);
  }
  register(user: User){
    return this.http.post('http://localhost:5000/register', user);
  }
}
