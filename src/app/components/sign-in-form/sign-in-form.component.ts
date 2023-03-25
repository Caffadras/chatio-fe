import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInDto, Token} from '../../domain/interfaces';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
})
export class SignInFormComponent {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  failedSignIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    let username: string = this.form.get('username')?.value;
    let password: string = this.form.get('password')?.value;
    let signInDto: SignInDto = {
      username: username,
      password: password,
    };

    this.authService.signIn(signInDto).subscribe({
      next: (token: Token) => {
        console.log('SIGNUP: ' + JSON.stringify(token));
        localStorage.setItem('jwtToken', token.token);
        this.failedSignIn = false;
        void this.router.navigate(['/chat']);
      },
      error: (error: Error) => {
        if (error.message === 'Unauthenticated') {
          console.log('Unauthenticated');
          this.failedSignIn = true;
        }
      },
    });
  }
}
