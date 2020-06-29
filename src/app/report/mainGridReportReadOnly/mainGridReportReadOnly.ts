import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainGridReportReadOnlyService } from 'src/app/services/mainGridReportReadOnly/mainGridReportReadOnly';

@Component({
  selector: 'app-mainGridReportReadOnly',
  templateUrl: './mainGridReportReadOnly.component.html',
  styleUrls: ['./mainGridReportReadOnly.component.scss']
})
export class MainGridReportReadOnlyComponent implements OnInit {

  //columns: any;
  // data = [{  C1: 'c11' ,CourseName:'CourseName1'},
  // {  C1: 'C12',CourseName:'CourseName2'}];

  displayedColumns = [];

  dataSource: MatTableDataSource<any>;
  columns = [];
  result: any;
  // columns = [

  //   {
  //     columnDef: 'CourseName',
  //     label: 'نام درس',
  //     cell: (row) => {
  //       return row.CourseName;
  //     }
  //   },
  //   {
  //     columnDef: 'C1',
  //     label: 'C1',
  //     cell: (row) => {
  //       return row.C1;
  //     }
  //   }

  // ];


  constructor(private configService: ConfigService,
    private mainGridReportReadOnly: MainGridReportReadOnlyService,
    private commonService: CommonService) {

  }

  ngOnInit() {
    
    this.getDataOfReport();
  }
  private getColumnsOfReport() {

    this.mainGridReportReadOnly.getColumnsOfReportReadOnly()
      .subscribe(
        (sucsess) => {
          console.log('sucsess', JSON.parse(sucsess));
          this.columns.push({
            columnDef: 'CourseName',
            label: 'نام درس',
            cell: (row) => {
              return row.CourseName;
            }
          })
          let result = JSON.parse(sucsess)
          result.forEach(eachColumns => {
           
            let mhd = {
              
              columnDef: eachColumns['columnName'],
              label: eachColumns['displayName'],
              cell: (row, c) => {
              
                console.log('chchchchchcho',row, c)
                return row[c.columnDef];
              }
            };


            this.columns.push(mhd)


          }

          );
         
          //this.dataSource = new MatTableDataSource(this.data);
          this.displayedColumns = this.columns.map(c => c.columnDef);
          this.dataSource = new MatTableDataSource(this.result);

          console.log('this.columns', this.columns);

        })
  }

  private getDataOfReport() {

    this.mainGridReportReadOnly.getDataOfReportReadOnly()
      .subscribe(
        (sucsess) => {
          
          console.log('rows', JSON.parse(sucsess));
          this.result = JSON.parse(sucsess)
          this.getColumnsOfReport();

        })
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
         
          <style>
           *{
              direction:rtl;
              font-family: 'iranSans';
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
  // private test(){
  //   this.result.forEach(eachheadersObj => {
  //     let mhd = {
  //         color: eachheadersObj['Color'],
  //         columnDef: eachheadersObj['CodeName'],
  //         label: eachheadersObj['CodeName'],
  //         cell: (row, label) => {
  //             let val = "EMPTY"
  //             row["CodesInfo"].forEach(cell => {
  //                 if (cell["CodeName"] == label) {
  //                     val = cell["Value"];
  //                 }
  //             });
  //             return val;
  //         }
  //     };
  //     this.calculatedColumns.push(mhd);
  //     this.displayedColumns.push(eachheadersObj['CodeName']);
  // });
  // }

}
