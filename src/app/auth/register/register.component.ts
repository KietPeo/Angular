import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterForm } from '../auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    comfirm_password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService) { }
  isFormIncomplete(): boolean {
    return !this.form.email || !this.form.password || !this.form.comfirm_password || this.form.password.length < 8 || this.form.comfirm_password.length < 8;
  }
  
  passwordsMatch(): boolean {
    return this.form.password === this.form.comfirm_password;
  }
  
  submit() {
    this.authService.register(this.form);
  }
}