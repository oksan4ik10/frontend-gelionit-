import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  // host: { class: 'login-page' }
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  loginForm: FormGroup | undefined;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder,) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  clickBtnForm(e: Event) {
    if (!this.loginForm) return
    e.preventDefault();
    this.authService.loginUser({ login: this.loginForm.value.login, password: this.loginForm.value.password }).subscribe(

      response => {
        const role = response.role.code
        if (role === 'worker') this.router.navigate(['/tabs/tab3'], { replaceUrl: true });
        else this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Некорректный логин или пароль. Пожалуйста, попытайтесь еще.';
      }
    );
  }
}
