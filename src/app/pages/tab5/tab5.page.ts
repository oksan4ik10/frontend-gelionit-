import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false,
})
export class Tab5Page implements OnInit {
  user: any;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  exit() {
    this.authService.logout()
  }
}
