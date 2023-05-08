import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IssuedBooksService } from 'src/app/shared/services/issued-books.service';

@Component({
  selector: 'app-returndialog-page',
  templateUrl: './returndialog-page.component.html',
  styleUrls: ['./returndialog-page.component.css'],
})
export class ReturndialogPageComponent implements OnInit {
  constructor(
    private IssuedBooksService: IssuedBooksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  bookReturned() {
    let deleteId = localStorage.getItem('deleteId');
    this.IssuedBooksService.bookReturnedOrCancelRequest(deleteId).subscribe(
      (data) => {
        this.toastr.info('Книга возвращена');
      }
    );
  }
}
