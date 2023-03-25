import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SignInDto, Token} from "../domain/interfaces";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "http://localhost:8080";
  signupHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })


  constructor(private http: HttpClient) {
  }

  signIn(credentials: SignInDto): Observable<Token> {
    let signInUrl = this.url + "/sign-in";
    return this.http.post<Token>(signInUrl, JSON.stringify(credentials), {headers: this.signupHeaders}).pipe(
      catchError((error) => {
        if ( error.status === 401 ) {
          throw new Error('Unauthenticated');
        }
        throw new Error(error);
      })
    );
  }

  isLoggedIn(): Observable<boolean>{
    return this.http.get(this.url + "/logCheck").pipe(map(() => true), catchError(() => of(false)));
  }

}
