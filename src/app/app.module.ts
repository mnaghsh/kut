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


const myRoots: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [LoginGuard],
    // canActivateChild: [LoginGuard],
    children: [
      { path: 'formula', loadChildren: './formula/formula.module#FormulaModule' },
      { path: 'report', loadChildren: './report/report.module#ReportModule' },
    ]
  },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    DashboardComponent,
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
       {useHash: true}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
