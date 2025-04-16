import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { Tab5Page } from './tab5.page';
import { Tab5PageRoutingModule } from './tab5-routing.module';




@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Tab5PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Tab5Page]
})
export class Tab5PageModule { }
