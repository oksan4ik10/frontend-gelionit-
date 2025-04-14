import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonAccordionGroup } from '@ionic/angular';
import { DeliveryStatus, DeliveryStatusLabels } from 'src/app/models/status';

import { AuthService } from 'src/app/service/auth.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
  // host: { class: 'login-page' }
})
export class HistoryPage implements OnInit {


  idOrder: string = ""
  product: any;
  order: any;
  history: any;
  orderStatus: any
  toggleIcons: string[] = []
  @ViewChild('accordionGroup', { static: true }) accordionGroup!: IonAccordionGroup;
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private routeActivate: ActivatedRoute, private httpService: HttpService,) {

  }

  ngOnInit() {
    this.routeActivate.params.subscribe(
      (queryParam: any) => {
        const idOrder = queryParam['id'];
        this.httpService.getHistoryOrder(idOrder).subscribe((res) => {
          this.order = res.order;
          this.product = res.product;
          this.history = res.data;

        }, (err) => {
          console.error(err)
        })
      }
    );
  }
  changeIcons(e: any) {
    const target = e.target.value;
    this.toggleIcons = (target as string[]);

  }
  getFormatDate(date: string) {
    return new Date(date).toLocaleDateString("ru")
  }

  getStatus(statusEN: DeliveryStatus) {

    return DeliveryStatusLabels[statusEN]
  }
}
