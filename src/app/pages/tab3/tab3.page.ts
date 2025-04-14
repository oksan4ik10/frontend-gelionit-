import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { distinctUntilChanged, map, Subject, switchMap } from 'rxjs';
import { ModalOrderComponent } from 'src/app/components/modal-order/modal-order.component';
import { DeliveryStatus, DeliveryStatusLabels } from 'src/app/models/status';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  orders: any = []
  loader = true;
  selectSort = 1
  selectedSortStatusSubject: Subject<string> = new Subject();
  statusesWithDesc: any = DeliveryStatusLabels
  statusesKeys = Object.keys(DeliveryStatusLabels)
  status = ""
  constructor(public modalCtrl: ModalController, private router: Router, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.selectedSortStatusSubject.pipe(
      map(event => this.handleChange(event)),
      distinctUntilChanged(),
      switchMap((t) => this.httpService.getOrders(t.sort, t.status))

    ).subscribe((data) => {
      console.log(data);
      this.orders = data;
      this.loader = false;

    })
    this.getOrders()
  }
  handleChange(e: string) {
    if (e === "sort") {
      this.selectSort = this.selectSort === 1 ? -1 : 1
    }
    this.loader = true;

    return ({ sort: this.selectSort, status: this.status })

  }
  getOrders() {
    this.httpService.getOrders(this.selectSort).subscribe(
      (data: any) => {
        this.orders = data;
        this.loader = false;
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
      this.getOrders()

    }

  }

  getStatus(statusEN: DeliveryStatus) {

    return DeliveryStatusLabels[statusEN]
  }
  getFormatDate(date: string) {
    return new Date(date).toLocaleDateString("ru")
  }
  handleSortChange() {
    this.selectedSortStatusSubject.next("sort");
  }
  handleStatusChange() {
    this.selectedSortStatusSubject.next("filter")
  }
}
