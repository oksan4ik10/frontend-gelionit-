import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalOrderComponent } from 'src/app/components/modal-order/modal-order.component';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  products: any = []
  loader = true;

  constructor(public modalCtrl: ModalController, private router: Router, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this.httpService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        console.log(data);

      },
      (error) => {
        console.error('Error loading categories', error);
        this.loader = false;
      }
    )

  }
  async openModalOrder(request: any) {
    console.log(request);
    const modal = await this.modalCtrl.create({
      component: ModalOrderComponent,
      cssClass: 'enquire',
      componentProps: {
        IDproduct: request._id,
        request: request
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      this.getProducts()

    }

  }

}
