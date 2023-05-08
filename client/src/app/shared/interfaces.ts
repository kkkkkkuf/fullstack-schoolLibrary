export interface User {
  [x: string]: any;
  fio: string;
  role: string;
  email: string;
  password: string;
  image: string;
  classA: string;
}

export interface Book {
  title: string;
  author: string;
  genre: string;
  about: string;
  count: number;
  image: string;
  forWhatClass: string;
}

export interface IssuedBook {
  bookId: string;
  title: string;
  author: string;
  image: string;
  memberFIO: string;
  memberEmail: string;
  issued: boolean;
  returned: boolean;
  dueDate: string;
  remarks: string;
}
