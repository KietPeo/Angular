import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from './auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  private usersUrl = 'http://localhost:4000/users';

  login(form: LoginForm) {
    this.http.get<any[]>(this.usersUrl).subscribe(users => {
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (user) {

        this.isAuthenticated = true;
        alert('Đăng nhập Thành công');
        this.router.navigate(['']);
      } else {
        alert('email không hợp lệ hoặc mật khẩu sai');
        this.isAuthenticated = false;
      }
    });
  }

  getAdmin(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }
  register(form: RegisterForm) {
    this.http.get<any[]>(this.usersUrl).subscribe(users => {
      const emailExists = users.some(u => u.email === form.email);
      if (emailExists) {
        this.errorMessage = 'Email đã tồn tại';
      } else {
        this.http.post(this.usersUrl, form).subscribe(
          (response) => {
            console.log('User registered successfully:', response);
            this.router.navigate(['login']);
            this.isAuthenticated = true;
            this.errorMessage = '';
          },
          (error) => {
            console.error('Error registering user:', error);
            this.errorMessage = 'Error registering user';
          }
          );
        alert('Đăng kí Thành công');
      }
    });
  }
  

  logout() {
    this.router.navigate(['login']);
            alert('Đăng xuất thành công');
            this.isAuthenticated = false;
  }
}
