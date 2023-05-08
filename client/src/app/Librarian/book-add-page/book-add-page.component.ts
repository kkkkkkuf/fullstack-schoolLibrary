import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/shared/services/books.service';

@Component({
  selector: 'app-book-add-page',
  templateUrl: './book-add-page.component.html',
  styleUrls: ['./book-add-page.component.css'],
})
export class BookAddPageComponent implements OnInit {
  form!: FormGroup;
  title: string = '';
  author: string = '';
  genre: string = '';
  image: string = '';
  count: number = 1;
  about: string = '';

  constructor(
    private toastr: ToastrService,
    private bookService: BookService
  ) {}

  get _title() {
    return this.form.get('title') as AbstractControl;
  }
  get _author() {
    return this.form.get('author') as AbstractControl;
  }

  get _genre() {
    return this.form.get('genre') as AbstractControl;
  }
  get _image() {
    return this.form.get('image') as AbstractControl;
  }
  get _count() {
    return this.form.get('count') as AbstractControl;
  }
  get _about() {
    return this.form.get('about') as AbstractControl;
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      about: new FormControl(null),
      count: new FormControl(null, [Validators.min(1), Validators.max(1000)]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const book = {
      title: this.title.trim(),
      author: this.author.trim(),
      genre: this.genre.trim(),
      about: this.about.trim(),
      count: this.count,
      image: this.image.trim(),
    };

    this.bookService.postBook(book).subscribe((data) => {
      if (data.success) {
        this.toastr.success('Книга добавлена');
        this.title = '';
        this.author = '';
        this.genre = '';
        this.image = '';
        this.count = 1;
        this.about = '';
      } else {
        this.toastr.error(
          'Книга не может быть добавлена в данный момент. Попробуйте позже!'
        );
      }
    });
  }
}
