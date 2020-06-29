
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainGridReportComponent } from './mainGridReport/mainGridReport';
import { IndexComponent } from './index/index.component';
import { MainGridReportReadOnlyComponent } from './mainGridReportReadOnly/mainGridReportReadOnly';
import { ContractComponent } from './Contract/contract.component';


const routes: Routes = [{
  path: '',
  component: IndexComponent,
  children: [
    {
      path: 'mainGridReport',
      component: MainGridReportComponent
    },
    {
      path: 'mainGridReportReadOnly',
      component: MainGridReportReadOnlyComponent
    }
    ,
    {
      path: 'Contract',
      component: ContractComponent
    }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
