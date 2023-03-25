import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignInFormComponent} from "../../components/sign-in-form/sign-in-form.component";
import {SignUpFormComponent} from "../../components/sign-up-form/sign-up-form.component";
import {ChatComponent} from "../../components/chat/chat.component";
import {canActivate} from "../../guards/auth-guard";


const appRoutes:Routes = [
  {path: "", redirectTo:"/auth/sign-in", pathMatch:"full"},
  {path: "auth/sign-in", component: SignInFormComponent},
  {path: "auth/sign-up", component: SignUpFormComponent},
  {path: "chat", canActivate:[() => canActivate()], component: ChatComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
