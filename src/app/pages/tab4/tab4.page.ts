import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalOrderComponent } from 'src/app/components/modal-order/modal-order.component';
import { ModalWorkerComponent } from 'src/app/components/modal-worker/modal-worker.component';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
  workers: any = []
  loader = true;
  searchTerm = ""

  constructor(public modalCtrl: ModalController, private router: Router, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getWorkers()
  }
  getWorkers() {
    this.httpService.getWorkers(this.searchTerm).subscribe(
      (data: any) => {
        this.workers = data;
        this.loader = false;
      },
      (error) => {
        console.error('Error loading categories', error);
        this.loader = false;
      }
    )

  }
  async openModalWorker(worker: any) {
    const modal = await this.modalCtrl.create({
      component: ModalWorkerComponent,
      cssClass: 'enquire',
      componentProps: {
        worker
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'success') {
      this.getWorkers()

    }

  }
  handleSearch(e: any) {
    const target = e.target as HTMLIonSearchbarElement;
    this.searchTerm = target.value?.toLowerCase() || '';
    this.loader = true;
    this.getWorkers()

  }
  updateProduct(product: any) {
    this.httpService.updateProduct(product._id, product).subscribe(() => {
      this.loader = true;
      this.modalCtrl.dismiss()
      this.getWorkers();

    }, (err) => {
      console.error(err)
    })
  }

}
