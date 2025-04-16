import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { Tab4Page } from './tab4.page';
import { Tab4PageRoutingModule } from './tab4-routing.module';




@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Tab4PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule { }
