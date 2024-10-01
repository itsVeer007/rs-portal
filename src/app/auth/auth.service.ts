import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    // private storageSer: StorageService
  ) { }

  // login(payload: any): Observable<any> {
  //   let url  = `${environment.authUrl}/userDetails/user_login_1_0`;
  //   return this.http.post(url, payload);
  // }

  login(payload:any) : Observable<any> {
    let url = `${environment.authUrl}/userDetails/user_login_1_0`;
    let myObj = {
      'userName':payload.userName,
      'password':payload.password
    }
    return this.http.post(url, myObj)
  }
  
}
