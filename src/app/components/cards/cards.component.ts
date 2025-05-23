import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalBookComponent } from '../modal-book/modal-book.component';
import { ModalOrderComponent } from '../modal-order/modal-order.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.conponents.scss'],
  standalone: false,
})
export class CardsComponent {


  @Input() products: any[] = [];
  @Input() isOrder = false;
  @Output() reloadProduct = new EventEmitter<void>();
  @Output() updateProduct = new EventEmitter<void>();
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
  async openModalOrder(product: any) {
    const modal = await this.modalCtrl.create({
      component: ModalOrderComponent,
      cssClass: 'enquire',
      componentProps: {
        IDproduct: product._id,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      this.reloadProduct.emit()

    }

  }

  updateProductCount(product: any) {
    this.updateProduct.emit(product)
  }
}
