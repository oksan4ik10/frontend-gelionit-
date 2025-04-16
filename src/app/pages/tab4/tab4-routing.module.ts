import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab4Page } from './tab4.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    component: Tab4Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab4PageRoutingModule { }
