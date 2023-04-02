import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {SignUpFormComponent} from './components/sign-up-form/sign-up-form.component';
import {SignInFormComponent} from './components/sign-in-form/sign-in-form.component';
import {ChatComponent} from './components/chat/chat.component';
import {AppRoutingModule} from "./modules/app-routing/app-routing.module";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {RxStompService} from "./services/rx-stomp.service";
import {rxStompServiceFactory} from "./services/rs-stomp-service-factory";
import {MessageComponent} from './components/message/message.component';
import {AuthService} from "./services/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    SignInFormComponent,
    ChatComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, {
    provide: RxStompService,
    useFactory: rxStompServiceFactory,
    deps: [AuthService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
