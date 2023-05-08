import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../shared/services/books.service';
import { Book } from '../shared/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book-modal-page',
  templateUrl: './edit-book-modal-page.component.html',
  styleUrls: ['./edit-book-modal-page.component.css'],
})
export class EditBookModalPageComponent implements OnInit {
  @Input() book: any;
  @Output() onSave: EventEmitter<Book> = new EventEmitter<Book>();
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;
  bookCopy: any;
  isBookChanged: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private bookService: BookService
  ) {}

  ngOnInit() {
    // создаем копию текущей книги
    this.bookCopy = { ...this.book };
  }

  saveBookChanges() {
    this.bookService.updateBook(this.bookCopy._id, this.bookCopy).subscribe(
      (data) => {
        this.onSave.emit(this.bookCopy);
        this.isBookChanged = false;
        this.activeModal.close('success');
      },
      (error) => {
        console.log(error);
        this.activeModal.dismiss('error');
      }
    );
  }

  dismissModal() {
    this.activeModal.dismiss('cancel');
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.bookCopy.image = reader.result;
      };
    }
  }

  onImageClick(): void {
    this.fileInput?.nativeElement?.click();
  }
}
