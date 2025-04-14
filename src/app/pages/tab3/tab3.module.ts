import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { Tab3Page } from './tab3.page';
import { Tab3PageRoutingModule } from './tab3-routing.module';




@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Tab3PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule { }
