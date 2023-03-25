import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

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
  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  onSubmit(): void{

  }

}
