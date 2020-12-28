import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';
import { ContractSignituresService } from 'src/app/services/contractSignitures/contractSignituresService';
import { totalMainGridReportService } from 'src/app/services/TotalmainGridReport/totalMainGridReport';
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  myDate = new Date().toLocaleDateString('fa-IR');
  userDetails: any;
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
  getcontractSignitureObj: any;
  error: any;
  showContract: boolean;
  result: any;
  vahedNahaie: any;
  madrak = [
    {value: "1", viewValue: 'کارشناسی ارشد'},
    {value: "2", viewValue: 'دکتری'}
  ]
  martabe = [
    {value: 1, viewValue: 'مربی آموزشیار'},
    {value: 2, viewValue: 'مربی'},
    {value: 3, viewValue: 'استادیار'},
    {value: 4, viewValue: 'دانشیار'},
    {value: 5, viewValue: 'استاد'},
    {value: 6, viewValue: 'حق التدریس'},

  ];
  martabeElmi: any;
  constructor(private configService: ConfigService,
    public commonService: CommonService,
    private totalMainGridReportService: totalMainGridReportService,
    private contractSigniture: ContractSignituresService,
    private dialog: MatDialog,
  ) {
    this.mhd = "mhd2"
    // this.addCommonFormul()
    // this.addCalculatedFormul();
    //  this.getColumnDescriptions();
  }

  ngOnInit() {
    //this.getDataOfReport()
    ////debugger
  }
  public btnChooseTeacher() {
    this.vahedNahaie=undefined;
    this.martabeElmi=undefined;
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
        if (data) {
          this.contractSigniture.getContractSignitures(this.commonService.termId).subscribe(
            (success) => {
              //debugger
             
              this.getcontractSignitureObj = JSON.parse(success)
              this.getcontractSignitureObj.forEach(eachContractSignitureObj => {
                if(eachContractSignitureObj.teacherId==data.id){
                  if(eachContractSignitureObj.signiture1!=null&&
                    eachContractSignitureObj.signiture2!=null&&
                    eachContractSignitureObj.signiture2!=null&&
                    eachContractSignitureObj.signiture2!=null||this.commonService.activeUser[0].type==1
                    ){

                      console.log('userDetails', data)
                      this.userDetails = data;
                      this.userId = data.id;
                      this.getDataOfReport()
                      this.fullName = data.fullName;
                      this.firstName = data.firstName;
                      this.lastName = data.lastName;
                      this.displayedColumns = null
                      this.dataSource = null;
                      this.columns = [];
                      this.showCourseValueTable = true
                      this.commonService.reportUserId = this.userId;
                      this.showContract=true;

                    }
                    else{
                      this.error="همه ی امضا ها برای مشاهده این قرارداد هنوز انجام نشده است"
                      this.showContract=false;

                    }
                }
              });
            }
          )

          
        }
      }
    )
  }

  // print(): void {
  //   let printContents, popupWin;
  //   printContents = document.getElementById('print-section').innerHTML;
  //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //   popupWin.document.open();
  //   popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>Print tab</title>
  //         <style>
  //          *{
  //             direction:rtl;
  //             font-family: 'B Nazanin';
  //             text-align: right;

  //           }
  //         //........Customized style.......
  //         </style>
  //       </head>
  //   <body onload="window.print();window.close()">${printContents}</body>
  //     </html>`
  //   );
  //   popupWin.document.close();
  // }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>پرینت قرارداد </title>
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

  save() {
    
  }

  private getDataOfReport() {

    //////debugger
    let body = {
      termId: this.commonService.termId,userId: this.userId
    }

    this.totalMainGridReportService.getTotalDataOfReport(body)
      .subscribe(
        (sucsess) => {
          
          this.result = JSON.parse(sucsess)
          if(this.result[0]){
          this.vahedNahaie=this.result[0]['C28']
          this.martabeElmi=this.result[0]['C22']}
          console.log('mhhhhhhhd', this.vahedNahaie);

        })
  }
  

}
