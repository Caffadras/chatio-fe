import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs";
import {Router} from "@angular/router";

export const canActivate = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn){
        return true;
      } else {
        void router.navigate(['/auth/sign-in']);
        return false;
      }
    })
  )
};
