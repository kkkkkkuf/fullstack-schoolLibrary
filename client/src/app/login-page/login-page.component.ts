import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { slideInOut } from 'src/app/animations/animation';
import { fade } from 'src/app/animations/fade';
import { AuthService } from '../shared/services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [slideInOut, fade],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  email: string = '';
  password: string = '';
  role: any;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get _email() {
    return this.form.get('email') as AbstractControl;
  }

  get _password() {
    return this.form.get('password') as AbstractControl;
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.route.queryParams.subscribe({
      next: (params: Params) => {
        if (params['reqistered']) {
          this.toastr.success(
            'Теперь вы можете зайти в систему используя свои данные'
          );

          // MaterialService.toast(
          //   'Теперь вы можете зайти в систему используя свои данные'
          // );
        } else if (params['accessDenied']) {
          this.toastr.info('Для начала авторизируйтесь в системе');

          // MaterialService.toast('Для начала авторизируйтесь в системе');
        } else if (params['sessionFailed']) {
          this.toastr.error('Пожалуйста войдите в систему заново');

          // MaterialService.toast('Пожалуйста войдите в систему заново');
        }
      },
    });
  }

  onSubmit() {
    const user = {
      email: this.email,
      password: this.password,
    };

    this.auth.login(user).subscribe((data) => {
      if (data.success) {
        this.auth.storeUserData(
          data.token,
          data.user,
          data.role,
          data.email,
          data.fio,
          data.id,
          data.image,
          data.classA
        );
        this.toastr.success('Вы вошли в систему');
        const role = localStorage.getItem('role');
        if ('учащийся' == role) {
          this.router.navigate(['/after_login']);
        } else if ('библиотекарь' == role) {
          this.router.navigate(['librarian/welcome']);
        }
      } else {
        this.toastr.error(data.message);
      }
    });
  }

  onMainPage() {
    this.router.navigate(['/']).then(() => {
      location.reload();
    });
  }
}
