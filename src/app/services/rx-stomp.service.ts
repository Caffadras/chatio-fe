import {Injectable} from '@angular/core';
import {IMessage, RxStomp} from "@stomp/rx-stomp";
import {AuthService} from "./auth.service";
import {ApiEndpoints} from "../domain/api-endpoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RxStompService extends RxStomp {

  constructor(private authService: AuthService) {
    super();
  }

  public send(message: string) {
    if (!this.connected()) {
      this.connect();
    }
    this.publish({destination: ApiEndpoints.SEND_QUEUE, body: message});
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

  public subscribeToQueue(): Observable<IMessage> {
    if (!this.connected()) {
      this.connect();
    }
    return this.watch(ApiEndpoints.LISTEN_QUEUE);
  }
}
