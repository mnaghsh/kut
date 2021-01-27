import { ConfigService } from './../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SigningContractService } from 'src/app/services/signingContract/signingContractService';
import { ContractSignituresService } from 'src/app/services/contractSignitures/contractSignituresService';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { ListOfFinanceService } from 'src/app/services/ListOfFinance/ListOfFinanceService';
import { ListOfUnsendToFinanceService } from 'src/app/services/ListOfUnsendToFinance/ListOfUnsendToFinanceService';
import * as XLSX from "xlsx";
@Component({
  selector: 'app-unSendListToFinance',
  templateUrl: './unSendListToFinance.html',
  styleUrls: ['./unSendListToFinance.scss']
})
export class UnSendListToFinanceComponent implements OnInit {
  martabe = [
    { value: 1, viewValue: 'مربی آموزشیار' },
    { value: 2, viewValue: 'مربی' },
    { value: 3, viewValue: 'استادیار' },
    { value: 4, viewValue: 'دانشیار' },
    { value: 5, viewValue: 'استاد' },
    { value: 6, viewValue: 'حق التدریس' },

  ];
  state = [
    { value: 1, viewValue: 'عادی' },
    { value: 2, viewValue: 'مدعو' },
    { value: 3, viewValue: 'مامور' },

  ];
  userId: number;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['rowNumber', 'code', 'fullName', 'akharinMadrakTahsili',
    'martabe','state', 'paye' ,'vahedMovazaf', 'vahedMazadBedoneZarayeb', 'vahedeTadrisShodeBaZarayeb',
    'vahedeMazadBaZarayeb', 'tedadSaateKol', 'saateTashkilNashode', 'tedadSaatebargozarShode', 'mablaghHarSaat',
    'mablaghKol', 'shomareHesab', 'sendToFinance'

  ];
  listOfFinance: any[];
  allTeachers: any[];
  inTeachers=[];
  outTeachers=[];
  constructor(
    public commonService: CommonService,
    private listOfUnsendToFinanceService: ListOfUnsendToFinanceService,
  ) {

  }
  ngOnInit() {

    this.getTeachersList()
  }


  getTeachersList() {
    this.commonService.loading = true
    this.listOfUnsendToFinanceService.getListOfFinance().subscribe(
      (success) => {
        this.listOfFinance = JSON.parse(success)
        this.roundNumber()
        console.log('listOfFinance', JSON.parse(success));
        this.changeTextOfEvidence();
        this.allTeachers = this.listOfFinance
        this.dataSource = new MatTableDataSource(this.listOfFinance);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.commonService.loading = false
      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
        this.commonService.loading = false

      }
    )
    // throw new Error('Method not implemented.');
  }
  changeTextOfEvidence() {
    this.listOfFinance.forEach(eachTeacher => {
      switch (eachTeacher.akharinMadrakTahsili) {
        case "1":
          eachTeacher.akharinMadrakTahsili = "کارشناسی ارشد"
          break;
        case "2":
          eachTeacher.akharinMadrakTahsili = "دکتری"
          break;

      }
    });

  }
  roundNumber() {
    this.listOfFinance.forEach(eachRow => {

      var num = eachRow['vahedMazadBedoneZarayeb']
      var roundedString = num.toFixed(2);
      var rounded = Number(roundedString);
      eachRow['vahedMazadBedoneZarayeb'] = rounded

      var num = eachRow['vahedeTadrisShodeBaZarayeb']
      var roundedString = num.toFixed(2);
      var rounded = Number(roundedString);
      eachRow['vahedeTadrisShodeBaZarayeb'] = rounded

      var num = eachRow['vahedeMazadBaZarayeb']
      var roundedString = num.toFixed(2);
      var rounded = Number(roundedString);
      eachRow['vahedeMazadBaZarayeb'] = rounded

      var num = eachRow['tedadSaateKol']
      var roundedString = num.toFixed(2);
      var rounded = Number(roundedString);
      eachRow['tedadSaateKol'] = rounded

      var num = eachRow['tedadSaatebargozarShode']
      var roundedString = num.toFixed(2);
      var rounded = Number(roundedString);
      eachRow['tedadSaatebargozarShode'] = rounded

      var num = eachRow['mablaghKol']
      var roundedString = num.toFixed(0);
      var rounded = Number(roundedString);
      eachRow['mablaghKol'] = rounded

    });

  }


  public saveChanges() {
    debugger

    var mhd = this.listOfFinance
    this.listOfFinance.forEach(eachListOfFinance => {
      if (eachListOfFinance.changed == true) {
        let updateQuery = `update contractSignitures 
      set sendToFinance='`+ eachListOfFinance.sendToFinance +
          `'  where teacherId=` + eachListOfFinance.id +
          ` and termId=` + this.commonService.termId
        this.sendToServer(updateQuery)
      }
    });


  }


  private sendToServer(updateQuery) {
    let body = {
      script: updateQuery
    }
    console.log('body', body)
    this.listOfUnsendToFinanceService.postListOfFinance(body).subscribe(
      (success) => {

        this.getTeachersList()

        this.commonService.showEventMessage("عملیات با موفقیت ذخیره شد")
      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  print(): void {


    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
        <title> گزارش پرداخت اساتید ارسال شده به واحد مالی  </title>
          <style>
           *{
              direction:rtl;
              font-family: 'B Nazanin';
              text-align: right;

            }
            td{
                
              border: 0px solid gray;
              border-left: 1px solid gray;
              border-bottom: 1px solid gray;
              font-size: x-small;
             
            }
            .table-striped tbody tr:nth-of-type(odd) {
              background-color: rgba(0,0,0,.05);
          }

         .headerGridTotal{
          font-size: small !important;
         }
         .gridTotal{
          width:100%;
         }
           
            .mat-sort-header-button{
              border-bottom: 1px solid gray;
              font-size: xx-small;
              background-color: white;
              border: 0px solid gray;
              text-align: center;
            }
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
  changeSignitures(row) {
    row.changed = true
  }
  filterTeachers(type) {
    this.inTeachers=[];
    this.outTeachers=[];
    console.log('type', type)
    switch (type) {
      case "all":
        this.dataSource = new MatTableDataSource(this.allTeachers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        break;
      case "dakheli":
        this.listOfFinance.forEach(echeTeacher => {
          if(echeTeacher.state!=2&&echeTeacher.martabe!=6){
            this.inTeachers.push(echeTeacher)
          }
        });
        this.dataSource = new MatTableDataSource(this.inTeachers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        break;

      case "khareji":
        this.listOfFinance.forEach(echeTeacher => {
          if(echeTeacher.state==2||echeTeacher.martabe==6){
            this.outTeachers.push(echeTeacher)
          }
        });
        this.dataSource = new MatTableDataSource(this.outTeachers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        break;
      
    }
  }
  exportTable(){
    this.exportToExcel("mainTable");
   
  }

  exportToExcel(tableId: string, name?: string) {
    let myDate = new Date().toLocaleDateString('fa-IR');
    //let timeSpan = new Date().toISOString();
    let prefix = name || "گزارش مالی ";
    let fileName = `${prefix}-${this.commonService.termName}-${myDate}`;
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}

