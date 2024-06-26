import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PanelModule } from 'primeng/panel'
import { ChartModule } from 'primeng/chart'


import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  providers: [DecimalPipe],
  imports: [
    CommonModule,
    SharedModule,
    PanelModule,
    ChartModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
