import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SignUpDto, Token} from "../../domain/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {

  form = this.fb.group({
    "firstName": ["", Validators.required],
    "lastName": ["", Validators.required],
    "username": ["", Validators.required],
    "password": ["", Validators.required]
  });

  failedSignUp: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    const signUpDto: SignUpDto = {
      firstName: this.form.get('firstName')?.value ?? '',
      lastName: this.form.get('lastName')?.value ?? '',
      username: this.form.get('username')?.value ?? '',
      password: this.form.get('password')?.value ?? ''
    }

    this.authService.signUp(signUpDto).subscribe({
      next: this.onSuccessfulSignIn.bind(this),
      error: (error: Error) => {
        if (error.message === 'Unauthenticated') {
          console.log('Unauthenticated');
          this.failedSignUp = true;
        }
      },
    });

  }

  private onSuccessfulSignIn(token: Token){
    console.log('SIGNUP: ' + JSON.stringify(token));
    localStorage.setItem('jwtToken', token.token);
    this.failedSignUp = false;
    void this.router.navigate(['/chat']);
  }
}
