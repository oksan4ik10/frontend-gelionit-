import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { AuthService } from 'src/app/service/auth.service';
import { DeliveryStatus, DeliveryStatusLabels } from 'src/app/models/status';


@Component({
  selector: 'app-modal-edit-order',
  templateUrl: './modal-edit-order.component.html',
  styleUrls: ['./modal-edit-order.component.scss'],
  standalone: false,
})
export class ModalEditOrderComponent implements OnInit {
  bookForm: FormGroup;
  product: any;
  submissionMessage: string = '';

  statusesWithDesc: any = DeliveryStatusLabels
  statusesKeys = Object.keys(DeliveryStatusLabels)

  @Input() IDproduct: string = "";
  @Input() order: any;
  workers: any = []
  isDisable = false;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private httpService: HttpService,
    private toastController: ToastController,
    private authService: AuthService
  ) {

    this.bookForm = this.fb.group({
      desc: [''],
      address: ['', Validators.required],
      status: ['', Validators.required],
      IDupdate_user: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getWorkers()
    const worker = this.authService.getCurrentUser();
    if (!worker) {
      this.modalCtrl.dismiss(null, "error")
    }
    if (this.order) {
      this.bookForm.patchValue({ desc: this.order.desc, address: this.order.address, status: this.order.status, IDupdate_user: worker.id })
    }



  }
  getWorkers() {
    this.httpService.getBusyWorkers().subscribe((res) => {
      this.workers = res;
    }, err => {
      console.error(err)
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    if (this.bookForm.invalid) {
      await this.presentToast("Не все поля заполнены корректно", "danger")
      return;
    }

    if ((this.bookForm.value.status === 'delivered' || this.bookForm.value.status === 'in_delivery' || this.bookForm.value.status === 'in_progress') && (this.order.count > this.order.product.count)) {
      await this.presentToast("Количество товаров на складе недостаточно", "danger")
      return;
    }
    this.isDisable = true;
    this.httpService.updateOrder(this.order._id, this.bookForm.value).subscribe(async (res) => {
      const text = 'Заказ изменен'
      await this.presentToast(text, "success")
      await this.modalCtrl.dismiss(null, "success")

    }, async err => {
      console.error(err);
      await this.presentToast("Ошибка. Попробуйте еще раз.", "danger")
      this.isDisable = false;
    })
  }
  async presentToast(text: string, color: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: "top",
      cssClass: "toast",
      color
    });

    await toast.present();
  }
  getFormatDate(date: string) {
    return new Date(date).toLocaleDateString("ru")
  }
}
