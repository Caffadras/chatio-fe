import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SignInDto, SignUpDto, Token} from "../domain/interfaces";
import {catchError, map, Observable, of} from "rxjs";
import {ApiEndpoints} from "../domain/api-endpoints";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  contentTypeHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  private helper = new JwtHelperService();


  constructor(private http: HttpClient, private router: Router) {
  }

  signIn(credentials: SignInDto): Observable<Token> {
    let signInUrl = ApiEndpoints.URL + ApiEndpoints.SIGN_IN;
    return this.http.post<Token>(signInUrl, JSON.stringify(credentials), {headers: this.contentTypeHeader}).pipe(
      catchError((error) => {
        if (error.status === 401) {
          throw new Error('Unauthenticated');
        }
        throw new Error(error);
      })
    );
  }

  private translateException(error: any): Error {
    if (error.status === 401) {
      throw new Error('Unauthenticated');
    }
    throw new Error(error);

  }

  signUp(credentials: SignUpDto): Observable<Token> {
    let signUpUrl = ApiEndpoints.URL + ApiEndpoints.SIGN_UP;
    return this.http.post<Token>(signUpUrl, JSON.stringify(credentials), {headers: this.contentTypeHeader}).pipe(
      catchError(error => {
        if (error.status === 401) {
          throw new Error('Unauthenticated');
        }
        throw new Error(error);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    let logCheckUrl = ApiEndpoints.URL + ApiEndpoints.LOG_CHECK;
    return this.http.get(logCheckUrl).pipe(map(() => true), catchError(() => of(false)));
  }

  getToken(): string | null{
    const token = localStorage.getItem("jwtToken");
    if (!token){
      void this.router.navigate(["/auth/sign-in"]);
    }
    return token;
  }

  getCurrentUserId(): number | null{
    const token = this.getToken();
    if (!token){
      return null;
    }
    const decodedToken = this.helper.decodeToken(token);

    return decodedToken.userId;
  }

}
