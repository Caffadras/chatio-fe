import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent {

  form: FormGroup = this.fb.group({
    "username": ["", Validators.required],
    "password": ["", Validators.required]
  })
  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void{
    console.log(this.form);
  }
}
