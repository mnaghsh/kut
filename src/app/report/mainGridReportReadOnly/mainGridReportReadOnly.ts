import { ConfigService } from '../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainGridReportService } from 'src/app/services/mainGridReport/mainGridReport';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';
import { CoursesComponent } from 'src/app/components/courses/courses.component';
import { MainGridReportReadOnlyService } from 'src/app/services/mainGridReportReadOnly/mainGridReportReadOnly';

export interface Term {
  id: number;
  name: string;
}
@Component({
  selector: 'app-mainGridReportReadOnly',
  templateUrl: './mainGridReportReadOnly.component.html',
  styleUrls: ['./mainGridReportReadOnly.component.scss']
})
export class MainGridReportReadOnlyComponent implements OnInit {
  myControl = new FormControl();
  options=[] ;
  filteredOptions: Observable<string[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [];
  newRowObj = {}
  dataSource: MatTableDataSource<any>;
  columns = [];
  result: any;
  uncalculatedColumns = [];
  dataOfUnCalculatedColumns = [];
  insertQuery: string;
  deleteQuery: string;
  coursesList: any;
  termList: any;
  termId;
  userId: number;
  showCourseValueTable = false;
  fullName = "انتخاب استاد"
  attachmentEndScript: string;
  selectedRow: any;
  showSaveBtn:boolean;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;  

  constructor(private configService: ConfigService,
    private _formBuilder: FormBuilder,
    private mainGridReport: MainGridReportReadOnlyService,
    private dialog: MatDialog,
    private commonService: CommonService) {
    this.userId = 0;
    this.termId = this.commonService.termId;
  }



  ngOnInit() {
    this.coursesList=this.commonService.coursesList
    this.getDataOfReport();
    this.filterAutoCompelete();

    
  }

private filterAutoCompelete(){
  //debugger
  this.options=this.coursesList
this.filteredOptions = this.myControl.valueChanges
.pipe(
  startWith(''),
  map(value => this.filter(value))
);
}
private filter(value: string): string[] {
  //debugger
  value=value['key']
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
}
ngOnDestroy() {
        if (this.commonService.showSaveBtn==true) {
          this.commonService.showEventMessage(" برخی ردیف ها تغییر یافته ولی ذخیره نشدند")
        }
        
    
    this.newRowObj = {};
  }

  private getColumnsOfReport() {
this.commonService.loading=true
    this.mainGridReport.getColumnsOfReportReadOnly()
      .subscribe(
        (sucsess) => {
          this.commonService.loading=false
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

                return row[c.columnDef];
              }
            };
            this.columns.push(mhd)
          }
          );

          this.displayedColumns = this.columns.map(c => c.columnDef);
          // this.displayedColumns.push('icon')

          this.dataSource = new MatTableDataSource(this.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('this.columns', this.displayedColumns);

        })
  }

  private getDataOfReport() {

    let body = {
      termId: this.termId, userId: this.userId
    }
    this.commonService.loading=true
    this.mainGridReport.getDataOfReportReadOnly(body)
      .subscribe(
        (sucsess) => {
          this.commonService.loading=false
          console.log('rows', JSON.parse(sucsess));
          this.result = JSON.parse(sucsess)
          this.getColumnsOfReport();

        })
  }

 
 private replaceNewData(){
  this.displayedColumns = null
  this.dataSource = null;
  this.columns = [];
  this.getDataOfReport();
  this.newRowObj = {};
  this.commonService.showSaveBtn=false;
  this.commonService.rollback.next(2);
 }
  addRow() {
    let textMessage
    //debugger
    if (this.result) {
      this.result.forEach(eachRowsOfTable => {
        if (this.commonService.showSaveBtn==true) {
           textMessage=" ردیف جدید با همه ی ردیف های در حال ویرایش ذخیره شدند "
        }
      });
    }
  
    // let tmp = this.newRowObj[Object.keys(this.newRowObj)[0]]
    if (!(this.newRowObj === undefined || this.newRowObj === null || Object.keys(this.newRowObj).length === 0)) {
      console.log(' this.mhd', this.newRowObj)
      this.newRowObj['userId'] = this.userId
      this.newRowObj['termId'] = this.termId
      //this.newRowObj['courseId'] = 3
      this.result = this.result.concat([this.newRowObj])
      //this.save(true,textMessage,"addRow")
      //debugger
     // this.result.push(this.newRowObj)
      this.dataSource = new MatTableDataSource(this.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.newRowObj={}
     
    }
  }
  deleteRow(row) {


    for (let i = 0; i < this.result.length; i++) {
      if (this.result[i].courseId == row.courseId) {
        this.result.splice(i, 1);
      }
    }
    this.dataSource = new MatTableDataSource(this.result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('resuletAfterDel', this.result)
    this.commonService.showSaveBtn=true
    //this.save(true);
  }


 
  displayFn(user?: Term): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Term[] {
    const filterValue = name.toLowerCase();

    return this.termList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private changeTerm() {
    this.displayedColumns = null
    this.dataSource = null;
    this.columns = [];
    this.getDataOfReport();
  }
  private btnChooseTeacher() {
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
      
        this.userId = data.id;
        this.fullName = data.fullName;
        this.displayedColumns = null
        this.dataSource = null;
        this.columns = [];
        this.showCourseValueTable = true
        this.getDataOfReport();
        this.commonService.reportUserId = this.userId;
            

      }
    )
  }
  private chooseCourse(row){
    this.selectedRow=row
    
    const dialogRef = this.dialog.open(CoursesComponent, {
      width: "85%",
      height: "85%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        this.commonService.loading=false
        if(data){
        this.selectedRow.CourseName=data.name
        this.selectedRow.courseId=data.id
       this.commonService.showSaveBtn=true
      }
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
