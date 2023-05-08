import { state, transition, trigger, animate, style } from "@angular/animations";

export let fade = trigger('fade', [
    state('void', style({opacity: 0})),

    transition(':enter', [
        animate(2000)
    ])
    
]);