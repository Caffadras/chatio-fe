export class ApiEndpoints {
  public static readonly URL: string = 'http://localhost:8080';
  public static readonly SIGN_IN: string = '/sign-in';
  public static readonly SIGN_UP: string = '/sign-up';
  public static readonly LOG_CHECK: string = '/logCheck';


  //Web socket related
  public static readonly WS_URL: string = 'ws://localhost:8080/greeting';
  public static readonly SEND_QUEUE: string = '/app/chat.send';
  public static readonly LISTEN_QUEUE: string = '/topic';

}
