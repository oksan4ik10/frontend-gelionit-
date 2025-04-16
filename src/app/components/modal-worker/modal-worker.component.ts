import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { AuthService } from 'src/app/service/auth.service';
import { DeliveryStatus, DeliveryStatusLabels } from 'src/app/models/status';


@Component({
  selector: 'app-modal-worker',
  templateUrl: './modal-worker.component.html',
  styleUrls: ['./modal-worker.component.scss'],
  standalone: false,
})
export class ModalWorkerComponent implements OnInit {
  bookForm: FormGroup;
  @Input() worker: any;
  roles: any = []
  isDisable = false;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private httpService: HttpService,
    private toastController: ToastController,
    private authService: AuthService
  ) {

    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      idRole: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getRoles()
    if (this.worker) {
      this.bookForm.patchValue({
        name: this.worker.name,
        login: this.worker.login,
        idRole: this.worker.idRole,
      })
      this.bookForm.get('name')?.disable();
      this.bookForm.get('login')?.disable();
      this.bookForm.get('idRole')?.disable();
    }

  }
  getRoles() {
    this.httpService.getRoles().subscribe((res) => {
      this.roles = res;
    }, err => {
      console.error(err)
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    if (this.bookForm.invalid && !this.worker) {
      await this.presentToast("Не все поля заполнены корректно", "danger")
      return;
    }
    this.isDisable = true;
    if (this.worker) {
      const password = this.bookForm.value.password;
      if (!password) {
        await this.presentToast("Не все поля заполнены корректно", "danger")
        return;
      }
      this.httpService.updateWorker(this.worker._id, { password }).subscribe(
        async () => {
          await this.presentToast('Пароль изменен', "success")
          await this.modalCtrl.dismiss(null, "success")

        }, async (err) => {
          console.error(err);
          await this.presentToast("Ошибка. Попробуйте еще раз.", "danger")
          this.isDisable = false;

        })
      return
    }
    this.httpService.createWorker(this.bookForm.value).subscribe(async () => {
      await this.presentToast('Сотрудник создан', "success")
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
