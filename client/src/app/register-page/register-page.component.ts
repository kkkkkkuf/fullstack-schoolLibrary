import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup;
  fio: string = '';
  classA: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  get _fio() {
    return this.form.get('fio') as AbstractControl;
  }

  get _classA() {
    return this.form.get('classA') as AbstractControl;
  }
  get _email() {
    return this.form.get('email') as AbstractControl;
  }

  get _password() {
    return this.form.get('password') as AbstractControl;
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      fio: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$'),
      ]),
      classA: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]?(?:[А-ЯЁ])$'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    const user = {
      fio: this.fio.trim(),
      classA: this.classA.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
    };

    this.auth.register(user).subscribe((data) => {
      if (data.success) {
        this.toastr.success(
          'Учетная запись создана. Пожалуйста, войдите в систему'
        );
        this.router.navigate(['/login']);
      } else {
        this.toastr.warning(data.message);
        this.ngOnInit();
      }
    });
  }
}
