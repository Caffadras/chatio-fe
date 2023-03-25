import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepting for request: " + JSON.stringify(req));
    const jwtToken: string | null = localStorage.getItem("jwtToken");
    if (jwtToken){
      console.log("jwtToken found! Cloning request");
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
      });
      return next.handle(clonedRequest);
    }
    console.log("jwtToken was not found!");
    return next.handle(req);
  }

  constructor() { }
}
