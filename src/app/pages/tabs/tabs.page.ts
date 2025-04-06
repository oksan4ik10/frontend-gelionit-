import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    const user = localStorage.getItem('user_info')
    console.log(user);
    const role = this.authService.getRole()
    console.log(role);


  }

}
