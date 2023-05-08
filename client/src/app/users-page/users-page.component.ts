import { Component, OnInit } from '@angular/core';
import { UserServies } from '../shared/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserModalPageComponent } from '../edit-user-modal-page/edit-user-modal-page.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { User } from '../shared/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = []; // массив отфильтрованных пользователей
  filterValue: string = '';
  filterType: any;
  constructor(
    private userService: UserServies,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.userService.getStudents().subscribe((data) => {
      this.users = JSON.parse(JSON.stringify(data));
      console.log(data);
      this.onFilter(); // применяем фильтрацию при загрузке страницы
    });
  }

  onEdit(user: User) {
    console.log(user);
    const modalRef = this.modalService.open(EditUserModalPageComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then(
      (result) => {
        console.log(result);
        this.ngOnInit();
        const index = this.users.findIndex((u) => u['_id'] == result._id);
        if (index >= 0) {
          this.users[index] = result;
          this.onFilter(); // применяем фильтрацию после редактирования пользователя
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        console.log('Пользователь успешно удален');
        // Перезагрузка списка пользователей после удаления
        this.ngOnInit();
      },
      (err) => {
        console.log('Ошибка при удалении пользователя:', err);
      }
    );
  }

  confirmAction(id: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Подтвердить действие';
    modalRef.componentInstance.message =
      'Вы уверены, что хотите выполнить это действие?';
    modalRef.result.then((result) => {
      if (result === 'ok') {
        // выполнить действие
        this.deleteUser(id);
      }
    });
  }

  onFilter() {
    if (this.filterValue) {
      this.filteredUsers = this.users.filter((user) => {
        if (this.filterType === 'class') {
          if (/^\d+$/.test(this.filterValue)) {
            if (this.filterValue.length === 1) {
              if (
                !user.classA.match(new RegExp(`^${this.filterValue}\\D`, 'i'))
              ) {
                return false;
              }
            } else if (this.filterValue.length === 2) {
              if (!user.classA.startsWith(this.filterValue)) {
                return false;
              }
            }
          } else if (
            !user.classA.toLowerCase().includes(this.filterValue.toLowerCase())
          ) {
            return false;
          }
        } else if (this.filterType === 'name') {
          if (
            !user.fio.toLowerCase().includes(this.filterValue.toLowerCase())
          ) {
            return false;
          }
        }
        return true;
      });
    } else {
      this.filteredUsers = this.users;
    }
  }
  clearFilter() {
    this.filterType = '';
    this.filterValue = '';
    this.onFilter();
  }
}
