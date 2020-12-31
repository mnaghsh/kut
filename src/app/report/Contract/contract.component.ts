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
  // martabe = [
  //   { value: 1, viewValue: 'مربی آموزشیار' },
  //   { value: 2, viewValue: 'مربی' },
  //   { value: 3, viewValue: 'استادیار' },
  //   { value: 4, viewValue: 'دانشیار' },
  //   { value: 5, viewValue: 'استاد' },
  //   { value: 6, viewValue: 'حق التدریس' },]
  // madrak = [
  //   { value: "1", viewValue: 'کارشناسی ارشد' },
  //   { value: "2", viewValue: 'دکتری' }
  // ]

  martabeElmi: any;
  
  rotbeMade2: any;
  payeMade2: any;

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
ngOnDestroy(){
  this.vahedNahaie = undefined;
  this.martabeElmi = undefined;
  this.showCourseValueTable = false
  this.payeMade2=undefined;
  this.rotbeMade2=undefined;
  this.userDetails=undefined;
  console.log('userDetails',this.userDetails)
  
}

  ngOnInit() {
    //this.getDataOfReport()
    ////debugger
  }
  public btnChooseTeacher() {
    this.vahedNahaie = undefined;
    this.martabeElmi = undefined;
    this.showCourseValueTable = false
    this.payeMade2=undefined;
    this.rotbeMade2=undefined;
    this.userDetails=undefined;
    
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
          this.commonService.loading = true;
          this.contractSigniture.getContractSignitures(this.commonService.termId).subscribe(
            (success) => {
              //debugger

              this.getcontractSignitureObj = JSON.parse(success)
              this.getcontractSignitureObj.forEach(eachContractSignitureObj => {
                if (eachContractSignitureObj.teacherId == data.id) {
                  if (eachContractSignitureObj.signiture1 != null &&
                    eachContractSignitureObj.signiture2 != null &&
                    eachContractSignitureObj.signiture2 != null &&
                    eachContractSignitureObj.signiture2 != null || this.commonService.activeUser[0].type == 1
                  ) {

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
                    this.showContract = true;
                    this.commonService.loading = false;
                  }
                  else {
                    this.commonService.showEventMessage("همه ی امضا ها برای مشاهده این قرارداد هنوز انجام نشده است")
                   
                    this.showContract = false;
                    this.commonService.loading = false;

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
      termId: this.commonService.termId, userId: this.userId
    }
    this.commonService.loading = true;
    this.totalMainGridReportService.getTotalDataOfReport(body)
      .subscribe(
        (sucsess) => {
          this.commonService.loading = false;
          this.result = JSON.parse(sucsess)
          if (this.result[0]) {
            this.vahedNahaie = this.result[0]['C28']
            var num =this.vahedNahaie
            var roundedString = num.toFixed(2);
            var rounded = Number(roundedString);
            this.vahedNahaie = rounded


            this.martabeElmi = this.result[0]['C22']
          }
          this.Process()
          console.log('this.martabeElmi', this.martabeElmi);

        })
  }



  
  Process() {
    switch (this.martabeElmi) {
      case 1:
        this.martabeElmi = "مربی آموزشیار"
        break;

      case 2:
        this.martabeElmi = "مربی"
        break;
      case 3:
        this.martabeElmi = "استادیار"
        break;
      case 4:
        this.martabeElmi = "دانشیار"
        break;
      case 5:
        this.martabeElmi = "استاد"
        break;
      case 6:
        this.martabeElmi = "حق التدریس"
        break;

    }
    switch (this.userDetails.akharinMadrakTahsili) {
      case "1":
        this.userDetails.akharinMadrakTahsili="کارشناسی ارشد"
        break;
      case "2":
        this.userDetails.akharinMadrakTahsili="دکتری"
        break;

    }
    if( this.martabeElmi != "حق التدریس"&& this.userDetails['paye']>0){
      this.payeMade2= this.userDetails['paye']
      this.rotbeMade2=this.martabeElmi
    }
    if(this.martabeElmi == "حق التدریس"){

      this.payeMade2= "1";
      if(this.userDetails.akharinMadrakTahsili=="دکتری"){
        this.rotbeMade2="استاد یار "
      }
      if(this.userDetails.akharinMadrakTahsili=="کارشناسی ارشد"){
        this.rotbeMade2="مربی "
      }
    }


  }


}
