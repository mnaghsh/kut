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
import { CoursesComponent } from '../components/courses/courses.component';
import { TotalMainGridReportReadOnlyComponent } from './totalMainGridReportReadOnly/totalMainGridReportReadOnly';
import { LoadingComponent } from '../components/loading/loading.component';
import { UnSendListToFinanceComponent } from './unSendListToFinance/unSendListToFinance';
import { SendListToFinanceComponent } from './sendListToFinance/sendListToFinance';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule,
  ],
  entryComponents: [],
  declarations: [IndexComponent,
    LoadingComponent, MainGridReportComponent,TotalMainGridReportReadOnlyComponent
    , MainGridReportReadOnlyComponent, ContractComponent,SendListToFinanceComponent,UnSendListToFinanceComponent]
})
export class ReportModule { }
