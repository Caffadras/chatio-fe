import {createRxStompConfig} from "../config/rx-stomp.config";
import {RxStompService} from "./rx-stomp.service";
import {AuthService} from "./auth.service";

export function rxStompServiceFactory(authService: AuthService) {
  const rxStomp = new RxStompService(authService);
  rxStomp.configure(createRxStompConfig());
  //rxStomp.activate();
  return rxStomp;
}
