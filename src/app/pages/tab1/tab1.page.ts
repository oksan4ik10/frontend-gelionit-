import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalOrderComponent } from 'src/app/components/modal-order/modal-order.component';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  requests: any = []
  loader = true;
  constructor(public modalCtrl: ModalController, private router: Router, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getRequests()
  }
  getRequests() {
    this.httpService.getUnprocessedRequests().subscribe((res: any) => {
      this.requests = res;
      this.loader = false;
    },
      (err) => {
        console.log(err);
        this.loader = false;

      })
  }
  async openModalOrder(request: any) {
    console.log(request);
    const modal = await this.modalCtrl.create({
      component: ModalOrderComponent,
      cssClass: 'enquire',
      componentProps: {
        IDproduct: request.product._id,
        request: request
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      this.getRequests()

    }

  }

}
