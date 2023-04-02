import {RxStompConfig} from '@stomp/rx-stomp';
import {ApiEndpoints} from "../domain/api-endpoints";

export function createRxStompConfig(): RxStompConfig {
  return {
    brokerURL: ApiEndpoints.WS_URL,

    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,

    reconnectDelay: 0,

    debug: (msg: string): void => {
      console.log(new Date(), msg);
    }
  }
}
