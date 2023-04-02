import {Injectable} from '@angular/core';
import {IMessage, RxStomp} from "@stomp/rx-stomp";
import {AuthService} from "./auth.service";
import {ApiEndpoints} from "../domain/api-endpoints";
import {map, Observable} from "rxjs";
import {ChatMessage, SendChatMessageDto} from "../domain/interfaces";

@Injectable({
  providedIn: 'root'
})
export class RxStompService extends RxStomp {

  constructor(private authService: AuthService) {
    super();
  }

  public send(message: SendChatMessageDto) {
    if (!this.connected()) {
      this.connect();
    }
    this.publish({destination: ApiEndpoints.SEND_QUEUE, body: JSON.stringify(message)});
  }

  public connect() {
    if (this.connected()) {
      return;
    }
    let token = this.authService.getToken();
    if (!token) {
      return;
    }
    console.log('Token cloned: ' + token);
    super.configure({connectHeaders: {Authorization: `Bearer ${token}`}, reconnectDelay: 1000});
    super.activate();
  }

  public subscribeToQueue(): Observable<ChatMessage> {
    if (!this.connected()) {
      this.connect();
    }
    return this.watch(ApiEndpoints.LISTEN_QUEUE).pipe(
      map( (message: IMessage) => {
        console.log(message.body);
        return JSON.parse(message.body);
      }
    ));
  }
}
