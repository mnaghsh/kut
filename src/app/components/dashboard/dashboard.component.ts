import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pages: Array<{ label: string, path: any, icon: any }>;
  singlePages: Array<{ label: string, path: any, icon: any }>;
  navBarItem: { label: string; path: string; icon: string; }[];
  constructor(private auth: AuthenticationService,
    private myRoute: Router) { }

  ngOnInit() {


    this.navBarItem = [
      { label: 'ورود اطلاعات', path: "/report/mainGridReport", icon: "fas fa-pencil" },
      { label: 'چاپ گزارش', path: "/report/mainGridReportReadOnly", icon: "fas fa-print" },
      { label: 'چاپ قرارداد استاد', path: "/report/Contract", icon: "fas fa-newspaper-o" }
      // { label: ' ایجاد آیتم غیرمحاسباتی کلی  ', path: "/report", icon: "far fa-envelope" },

      // { label: ' کالک ', path: "/calk", icon: "fas fa-map" },
    ];


    this.pages = [
      { label: ' آیتم های غیرمحاسباتی وابسته به درس  ', path: "/formula/commonFormula", icon: "fas fa-plus" },
      { label: ' آیتم های  محاسباتی وابسته به درس ', path: "/formula/calculatedFormula", icon: "fas fa-plus-square-o" },
      { label: ' آیتم های غیر محاسباتی کلی ', path: "/formula/totalCommonFormula", icon: "fal fa-compass" },
      { label: ' آیتم های محاسباتی کلی ', path: "/formula/totalCalculatedFormula", icon: "fal fa-compass" },
      { label: ' چاپ گزارش ', path: "/report/mainGridReport", icon: "fas fa-print" },
      { label: ' ورود اطلاعات ', path: "/report/mainGridReportReadOnly", icon: "fas fa-pencil" },
      { label: 'چاپ قرارداد استاد', path: "/report/Contract", icon: "fas fa-newspaper-o" }
      // { label: ' ایجاد آیتم غیرمحاسباتی کلی  ', path: "/report", icon: "far fa-envelope" },

      // { label: ' کالک ', path: "/calk", icon: "fas fa-map" },
    ];

    this.singlePages = [
      { label: ' اطلاعات کاربر ', path: "/user-info", icon: "fas fa-user" },
      // { label: ' بروزرسانی ', path: "/update", icon: "fas fa-refresh" },
      // { label: ' عملیات ', path: "/mission-info", icon: "fas fa-opera" },
    ];
  }
  logout() {
    this.auth.wasLoggedOut();
    this.myRoute.navigate(['login']);

  }
}
