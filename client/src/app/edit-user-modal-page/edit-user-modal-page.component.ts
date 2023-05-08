import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServies } from '../shared/services/user.service';
import { User } from '../shared/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-modal-page',
  templateUrl: './edit-user-modal-page.component.html',
  styleUrls: ['./edit-user-modal-page.component.css'],
})
export class EditUserModalPageComponent {
  @Input() user!: User;
  userCopy!: User;
  @Output() onSave: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserServies,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userCopy = Object.assign({}, this.user);
  }

  onUpdate() {
    this.userService.updateUser(this.userCopy['_id'], this.userCopy).subscribe(
      (data) => {
        this.activeModal.close(data);
        this.toastr.info('Данные обновлены');
      },
      (error) => console.error(error)
    );
  }

  dismiss() {
    // Закрытие модального окна без сохранения
    this.activeModal.dismiss('Dismissed');
  }
}
