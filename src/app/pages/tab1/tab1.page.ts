import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  requests: any = []
  constructor(public modalController: ModalController, private router: Router, private httpService: HttpService) {
  }
  ngOnInit(): void {
    this.httpService.getUnprocessedRequests().subscribe((res: any) => {
      this.requests = res;
    },
      (err) => {
        console.log(err);

      })
  }
  ionViewDidEnter() {
    console.log(9000);


    //this.presentModalCoaching();
  }


}
