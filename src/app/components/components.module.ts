import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MenuComponent } from './menu/menu.component';
import { CardsComponent } from './cards/cards.component';
import { ModalBookComponent } from './modal-book/modal-book.component';
import { EllipsisModule } from 'ngx-ellipsis';

import { ModalOrderComponent } from './modal-order/modal-order.component';
import { ModalEditOrderComponent } from './modal-edit-order/modal-edit-order.component';
import { ModalWorkerComponent } from './modal-worker/modal-worker.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MenuComponent,
    CardsComponent,
    ModalBookComponent,
    ModalOrderComponent,
    ModalEditOrderComponent,
    ModalWorkerComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    EllipsisModule
  ],
  exports: [
    MenuComponent,
    CardsComponent,
    ModalBookComponent,
    ModalOrderComponent,
    ModalEditOrderComponent,
    ModalWorkerComponent
  ],
})
export class ComponentsModule { }
