import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';
import { SharedModule } from '../share.module';

import { IndexComponent } from './index/index.component';
import { MainGridReportComponent } from './mainGridReport/mainGridReport';
import { ReportRoutingModule } from './report-routing.module';
import { MainGridReportReadOnlyComponent } from './mainGridReportReadOnly/mainGridReportReadOnly';
import { ContractComponent } from './Contract/contract.component';
import { TeacherComponent } from '../components/teacher/teacher.component';
import { TotalMainGridReportComponent } from './totalMainGridReport/totalMainGridReport';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule,
  ],
  entryComponents: [TeacherComponent],
  declarations: [IndexComponent, MainGridReportComponent
    , MainGridReportReadOnlyComponent, ContractComponent,TeacherComponent,TotalMainGridReportComponent]
})
export class ReportModule { }
