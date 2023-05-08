import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { UserServies } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  fio = localStorage.getItem('fio');
  library_card_number = localStorage.getItem('id');
  email = localStorage.getItem('email');
  selectedFile!: File | null;

  @ViewChild('input') inputRef!: ElementRef;
  imageSrc!: File;
  imagePreview = '';
  user!: User;
  users: any;

  constructor(
    private userService: UserServies,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.currentUser();
  }

  currentUser() {
    this.userService
      .getcurrentUser(this.library_card_number)
      .subscribe((data) => {
        this.users = JSON.parse(JSON.stringify(data));
        console.log((this.users = JSON.parse(JSON.stringify(data))));
      });
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    const id = localStorage.getItem('id');
    this.userService
      .updateUserPhoto(id!, this.selectedFile!)
      .subscribe((data) => {
        console.log(data);
        this.currentUser();
        this.toastr.info('Вы изменили фотографию пользователя');
      });
  }
}
