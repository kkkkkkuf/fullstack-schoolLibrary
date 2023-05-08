import { ElementRef } from '@angular/core';

//это все от библиотеки materialize
declare var M: {
  FloatingActionButton: any;
  toast: (arg0: { html: string }) => void;
};

export class MaterialService {
  static toast(message: string) {
    M.toast({ html: message });
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }
}
