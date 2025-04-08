import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { AuthService } from 'src/app/service/auth.service';
import { DeliveryStatus, DeliveryStatusLabels } from 'src/app/models/status';


@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.scss'],
  standalone: false,
})
export class ModalOrderComponent implements OnInit {
  bookForm: FormGroup;
  product: any;
  submissionMessage: string = '';

  @Input() IDproduct: string = "";
  @Input() request: any;
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
      IDproduct: [this.IDproduct],
      IDrequest: [""],
      name_user: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      desc: [''],
      IDworker: ['', Validators.required],
      address: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]],
      IDmanager: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getWorkers()
    const manager = this.authService.getCurrentUser();
    if (!manager) {
      this.modalCtrl.dismiss(null, "error")
    }
    this.bookForm.patchValue({ name_user: this.request.name_user, phone: this.request.phone, email: this.request.email, IDrequest: this.request._id, IDproduct: this.request.product._id, IDmanager: manager.id })


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
    this.isDisable = true;
    this.httpService.createOrder(this.bookForm.value).subscribe(async (res) => {
      let color = "success"
      if (res.status === DeliveryStatus.WAITING_FOR_STOCK) {
        color = "warning"
      }
      await this.presentToast(`Заявка создана со статусом "${DeliveryStatusLabels[res.status]}"`, color)
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
}
