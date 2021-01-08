import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  expertPages: { label: string; path: string; icon: string; }[];
 
  pages: Array<{ label: string, path: any, icon: any }>;
  adminPages: Array<{ label: string, path: any, icon: any }>;
  navBarItem: { label: string; path: string; icon: string; }[];
  delegationSigniture: { label: string; path: string; icon: string; }[];
  panelOpenState = false;
  addItems: { label: string; path: string; icon: string; }[];
  cartable: { label: string; path: string; icon: string; }[];
  onlineUser: any;

  constructor(private auth: AuthenticationService,
    public commonService:CommonService,
    private myRoute: Router) { 
      this.onlineUser = this.commonService.activeUser[0].type
    }

  ngOnInit() {
  

    this.navBarItem = [
      { label: ' تغییر اطلاعات اساتید', path: "/teachersDetail", icon: "fas fa-users" },
      { label: 'ورود اطلاعات', path: "/report/mainGridReport", icon: "fas fa-pencil" },
      { label: 'چاپ گزارش', path: "/report/mainGridReportReadOnly", icon: "fas fa-print" },
      { label: 'چاپ قرارداد استاد', path: "/report/Contract", icon: "fas fa-newspaper-o" },
     
      // { label: ' ایجاد آیتم غیرمحاسباتی کلی  ', path: "/report", icon: "far fa-envelope" },

      // { label: ' کالک ', path: "/calk", icon: "fas fa-map" },
    ];

this.addItems=[
  { label: ' آیتم های غیرمحاسباتی وابسته به درس  ', path: "/formula/commonFormula", icon: "fas fa-plus" },
  { label: ' آیتم های  محاسباتی وابسته به درس ', path: "/formula/calculatedFormula", icon: "fas fa-plus-square-o" },
  { label: ' آیتم های غیر محاسباتی کلی ', path: "/formula/totalCommonFormula", icon: " fa-plus-circle" },
  { label: ' آیتم های محاسباتی کلی ', path: "/formula/totalCalculatedFormula", icon: " fa-plus-square" },
]
    this.pages = [
    
      { label: ' ورود اطلاعات ', path: "/report/mainGridReport", icon: "fas fa-pencil" },
      { label: ' چاپ گزارش ', path: "/report/mainGridReportReadOnly", icon: "fas fa-print" },
      { label: 'چاپ قرارداد استاد', path: "/report/Contract", icon: "fas fa-newspaper-o" }
   
    ];

 

    this.adminPages = [
      { label: ' تنظیمات کاربران سیستم', path: "/register", icon: "fas fa-user-plus" },
      { label: ' تنظیمات اساتید', path: "/registerTeachers", icon: "fas fa-user-plus" },
     
      // { label: ' بروزرسانی ', path: "/update", icon: "fas fa-refresh" },
      // { label: ' عملیات ', path: "/mission-info", icon: "fas fa-opera" },
    ];
    this.expertPages = [
     
      { label: ' تغییر اطلاعات اساتید', path: "/teachersDetail", icon: "fas fa-users" },
      // { label: ' بروزرسانی ', path: "/update", icon: "fas fa-refresh" },
      // { label: ' عملیات ', path: "/mission-info", icon: "fas fa-opera" },
    ];
    this.delegationSigniture = [
      { label: 'اعطا حق امضا واحد های محاسبه شده به کاربران', path: "/delegationSigniture", icon: " fa-check-square-o" },
      // { label: 'اعطا حق امضا واحد های محاسبه شده به کاربران', path: "/delegationSignitureForCalculationUnits", icon: " fa-check" },
     
    ];
    this.cartable = [
      { label: 'کارتابل تایید واحد های محاسبه شده', path: "/contractSignitures", icon: " fa fa-file" },
      // { label: ' تایید واحد های محاسبه شده', path: "/contractSignituresForCalculationUnits", icon: " fa fa-file-o" },
     
    ];
    

  }
  logout() {
    this.auth.wasLoggedOut();
    this.myRoute.navigate(['login']);

  }
}
