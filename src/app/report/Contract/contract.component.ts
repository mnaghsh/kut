import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  displayName: string;
  description: string;
  mhd;
  showCourseValueTable: boolean;
  userId: any;
  displayedColumns: any;
  dataSource: any;
  columns: any[];
  fullName = "انتخاب استاد";
  firstName: any;
  lastName: any;
  constructor(private configService: ConfigService,
    public commonService: CommonService,
    private dialog: MatDialog,
  ) {
    this.mhd = "mhd2"
    // this.addCommonFormul()
    // this.addCalculatedFormul();
    //  this.getColumnDescriptions();
  }

  ngOnInit() {
    //debugger
  }
  public btnChooseTeacher() {
    this.showCourseValueTable = false
    //this.newRowObj = {};
    const dialogRef = this.dialog.open(TeacherComponent, {
      width: "85%",
      height: "85%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        debugger
        this.userId = data.id;
        this.fullName = data.fullName;
        this.firstName=data.firstName;
        this.lastName=data.lastName;
        this.displayedColumns = null
        this.dataSource = null;
        this.columns = [];
        this.showCourseValueTable = true
        // this.getDataOfReport();
        this.commonService.reportUserId = this.userId;


      }
    )
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
           *{
              direction:rtl;
              font-family: 'B Nazanin';
              text-align: right;

            }
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
