import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chat} from "../domain/interfaces";
import {ApiEndpoints} from "../domain/api-endpoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }


  public getChatInfo(): Observable<Chat>{
    //for now, we have only 1 chat, so we hardcode its id.
    const url: string = ApiEndpoints.URL + '/chat/1';
    return this.http.get<Chat>(url);
  }
}
