import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { IssuedialogPageComponent } from '../dialogs/issuedialog-page/issuedialog-page.component';
import { IssuedBooksService } from '../shared/services/issued-books.service';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css'],
})
export class RequestPageComponent implements OnInit {
  list: any[] | undefined;

  imageWidth: number = 50;
  imageMargin: number = 2;

  constructor(
    private IssuedBooksService: IssuedBooksService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.IssuedBooksService.waitingForIssued().subscribe((data) => {
      this.list = JSON.parse(JSON.stringify(data));
    });
  }

  openDialog(user: any): void {
    localStorage.setItem('IssueId', user._id.toString());
    localStorage.setItem('memberEmail', user.memberEmail.toString());
    localStorage.setItem('bookTitle', user.title.toString());
    let dialogRef = this.dialog.open(IssuedialogPageComponent);
    height: '40%';
    width: '60%';
    //Refresh page after dialog close angular
    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  }

  onCancel(book: any) {
    const idBook = book._id.toString();
    this.IssuedBooksService.bookReturnedOrCancelRequest(idBook).subscribe(
      (data) => {
        this.toastr.info('Вы отклонили запрос');
        this.ngOnInit();
      }
    );
  }

  confirmAction(book: any) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Подтвердить действие';
    modalRef.componentInstance.message =
      'Вы уверены, что хотите выполнить это действие?';
    modalRef.result.then((result) => {
      if (result === 'ok') {
        // выполнить действие
        this.onCancel(book);
      }
    });
  }

  hasRequest(): boolean {
    return Array.isArray(this.list) && this.list.length > 0;
  }
}
