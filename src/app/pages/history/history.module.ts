import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HistoryPage } from './history.page';
import { HistoryPageRoutingModule } from './history-routing.module';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HistoryPageRoutingModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule


    ],
    declarations: [HistoryPage]
})
export class HistoryPageModule { }
