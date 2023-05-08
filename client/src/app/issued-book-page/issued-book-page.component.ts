import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReturndialogPageComponent } from '../dialogs/returndialog-page/returndialog-page.component';
import { IssuedBooksService } from '../shared/services/issued-books.service';
import { IssuedBook } from '../shared/interfaces';

@Component({
  selector: 'app-issued-book-page',
  templateUrl: './issued-book-page.component.html',
  styleUrls: ['./issued-book-page.component.css'],
})
export class IssuedBookPageComponent implements OnInit {
  list: IssuedBook[] = [];
  filteredList: IssuedBook[] = [];
  filterFIO: string = '';

  imageWidth: number = 50;
  imageMargin: number = 2;

  constructor(
    private IssuedBooksService: IssuedBooksService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.IssuedBooksService.waitingForReturned().subscribe((data) => {
      this.list = JSON.parse(JSON.stringify(data));
      console.log(data);
      this.onFilter();
    });
  }

  openDialog(user: any): void {
    localStorage.setItem('deleteId', user._id.toString());
    let dialogRef = this.dialog.open(ReturndialogPageComponent);

    height: '40%';
    width: '60%';

    dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  }

  onFilter() {
    if (this.filterFIO) {
      this.filteredList = this.list.filter((user) => {
        if (
          !user.memberFIO.toLowerCase().includes(this.filterFIO.toLowerCase())
        ) {
          return false;
        }
        return true;
      });
    } else {
      this.filteredList = this.list;
    }
  }

  clearFilter() {
    this.filterFIO = '';
    this.onFilter();
  }
}
