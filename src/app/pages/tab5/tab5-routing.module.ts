import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab5Page } from './tab5.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    component: Tab5Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab5PageRoutingModule { }
