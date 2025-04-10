import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        canLoad: [AuthGuard],
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        canLoad: [AuthGuard],
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      // {
      //   path: 'tab5',
      //   canLoad: [AuthGuard],
      //   loadChildren: () => import('../concent-forms/concent-forms.module').then(m => m.ConcentFormsPageModule)
      // },
      // {
      //   path: 'tab2',
      //   canLoad: [AuthGuard],
      //   loadChildren: () => import('../appointment-availability/appointment-availability.module').then(m => m.AppointmentAvailabilityPageModule)
      // },
      // {
      //   path: 'tab3',
      //   canLoad: [AuthGuard],
      //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      // },
      // {
      //   path: 'tab4',
      //   canLoad: [AuthGuard],
      //   loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      // },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
