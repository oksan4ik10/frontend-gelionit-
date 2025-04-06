import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalBookComponent } from '../modal-book/modal-book.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.conponents.scss'],
  standalone: false,
})
export class CardsComponent {


  @Input() products: any[] = [];
  constructor(private router: Router, private modalCtrl: ModalController) { }

  async openModal(product: any) {
    console.log(product);

    const modal = await this.modalCtrl.create({
      component: ModalBookComponent,
      cssClass: 'enquire',
      componentProps: {
        IDproduct: product._id
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);

    }
  }
}
