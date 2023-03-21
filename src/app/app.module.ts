import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {SignUpFormComponent} from './sign-up-form/sign-up-form.component';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component';


const appRoutes:Routes = [
  {path: "", redirectTo:"/auth/sign-in", pathMatch:"full"},
  {path: "auth/sign-in", component: SignInFormComponent},
  {path: "auth/sign-up", component: SignUpFormComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    SignInFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
