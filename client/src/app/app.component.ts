import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// export class AppComponent implements OnInit {
//   constructor(private auth: AuthService) {}

//   ngOnInit(): void {
//     const pottentialToken = localStorage.getItem('auth-token');
//     if (pottentialToken !== null) {
//       this.auth.setToken(pottentialToken);
//     }
//   }
// }
export class AppComponent {
  title = 'Frontend';
}
