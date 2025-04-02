import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MenuComponent } from './menu/menu.component';
import { CardsComponent } from './cards/cards.component';
import { EllipsisModule } from 'ngx-ellipsis';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MenuComponent,
    CardsComponent,
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
  ],
})
export class ComponentsModule { }
