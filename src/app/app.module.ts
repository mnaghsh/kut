import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//for angular material
import { MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatSidenavModule, MatTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './share.module';
import { TotalMainGridReportComponent } from './report/totalMainGridReport/totalMainGridReport';
import { LoadingComponent } from './components/loading/loading.component';
import { RegisterComponent } from './components/register/register.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DelegationSignitureComponent } from './components/signingContract/delegationSigniture.component';
import { ContractSignituresComponent } from './components/contractSignitures/contractSignitures';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DelegationSignitureForCalculationUnitsComponent } from './components/signingContractForCalculationUnits/delegationSignitureForCalculationUnits.component';
import { ContractSignituresForCalculationUnitsComponent } from './components/contractSignituresForCalculationUnits/contractSignituresForCalculationUnits';
import { CategoryComponent } from './components/category/category.component';
import { UsersComponent } from './components/users/users.component';
import { TeachersDetailComponent } from './components/teachersDetail/teachersDetail.component';
import { AllPersonsComponent } from './components/allPersons/allPersons.component';
import { RegisterTeachersComponent } from './components/registerTeachers/registerTeachers.component';
//import { TeachersDetailComponent } from './components/teachersDetail/teachersDetail.component';


const myRoots: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [LoginGuard],
    // canActivateChild: [LoginGuard],
    children: [
      { path: 'formula', loadChildren: './formula/formula.module#FormulaModule' },
      { path: 'report', loadChildren: './report/report.module#ReportModule' },
      { path: 'delegationSigniture', component: DelegationSignitureComponent },
      { path: 'delegationSignitureForCalculationUnits', component: DelegationSignitureForCalculationUnitsComponent },
      { path: 'contractSignitures', component: ContractSignituresComponent },
      { path: 'contractSignituresForCalculationUnits', component: ContractSignituresForCalculationUnitsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'registerTeachers', component: RegisterTeachersComponent },
      { path: 'SendListToFinance', component: RegisterTeachersComponent },
      { path: 'unSendListToFinance', component: RegisterTeachersComponent },
      { path: 'teachersDetail', component: TeachersDetailComponent }


    ],
  },
  { path: 'login', component: LoginComponent },
  //{ path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},



];

@NgModule({
  declarations: [
    AllPersonsComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterTeachersComponent,
    TeachersDetailComponent,
    DelegationSignitureComponent,
    DelegationSignitureForCalculationUnitsComponent,
    DashboardComponent,
    CategoryComponent, TeacherComponent, UsersComponent, CoursesComponent, ConfirmComponent,
    ContractSignituresComponent,
    ContractSignituresForCalculationUnitsComponent,
    TotalMainGridReportComponent
  ],
  imports: [

    AngularFontAwesomeModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,

    RouterModule.forRoot(myRoots,
      { useHash: true }
    ),
  ],
  entryComponents: [CategoryComponent, AllPersonsComponent, UsersComponent, TeacherComponent, CoursesComponent, ConfirmComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
