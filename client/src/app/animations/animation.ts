import { state, transition, trigger, animate, style } from "@angular/animations";

export let slideInOut =
    trigger('slideInOut', [


        transition(':enter', [
          style({transform: 'translateX(-100%)'}),
          animate('500ms ease-in', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
        ])
      ]);