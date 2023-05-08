import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IssuedBooksService } from '../../shared/services/issued-books.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-issuedialog-page',
  templateUrl: './issuedialog-page.component.html',
  styleUrls: ['./issuedialog-page.component.css'],
})
export class IssuedialogPageComponent implements OnInit {
  item = {
    _id: localStorage.getItem('IssueId'),
    title: localStorage.getItem('bookTitle'),
    memberEmail: localStorage.getItem('memberEmail'),
    dueDate: '',
    remarks: '',
    issued: false,
  };

  constructor(
    private IssuedBooksService: IssuedBooksService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<IssuedialogPageComponent>
  ) {}

  ngOnInit(): void {}

  getMinDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // format to YYYY-MM-DD
    const minDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;

    return minDate;
  }

  issueBook() {
    if (!this.item.dueDate || new Date(this.item.dueDate) < new Date()) {
      this.toastr.error(
        'Дата сдачи не может быть пустой и меньше текущей даты'
      );
      return;
    }

    this.IssuedBooksService.issueBook(this.item);
    this.toastr.success('Книга выдана');

    localStorage.removeItem('IssueId');
    localStorage.removeItem('bookTitle');
    localStorage.removeItem('memberEmail');
    this.dialogRef.close();
  }
}
