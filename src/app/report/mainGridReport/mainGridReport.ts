import { ConfigService } from '../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainGridReportService } from 'src/app/services/mainGridReport/mainGridReport';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';

export interface Term {
  id: number;
  name: string;
}
@Component({
  selector: 'app-mainGridReport',
  templateUrl: './mainGridReport.component.html',
  styleUrls: ['./mainGridReport.component.scss']
})
export class MainGridReportComponent implements OnInit {

  options: Term[] = [
    { id: 1, name: 'Mary' },
    { id: 2, name: 'Shelley' },
    { id: 3, name: 'Igor' }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  myControl = new FormControl();
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

  filteredOptions: Observable<Term[]>;
  userId: number;
  showCourseValueTable = false;
  fullName = "انتخاب استاد"
  attachmentEndScript: string;

  constructor(private configService: ConfigService,
    private mainGridReport: MainGridReportService,
    private dialog: MatDialog,
    private commonService: CommonService) {
    this.userId = 0;
    this.termId = this.commonService.termId;
  }



  ngOnInit() {
    this.getCourseList()
    this.getTermList()
    this.getDataOfReport();

  }
  ngOnDestroy() {
    if (this.result) {
      this.result.forEach(eachRowsOfTable => {
        if (eachRowsOfTable.changed) {
          this.commonService.showEventMessage(" برخی ردیف ها تغییر یافته ولی ذخیره نشدند")
        }
      });
    }
    this.newRowObj = {};
  }

  private getColumnsOfReport() {

    this.mainGridReport.getColumnsOfReport()
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

                return row[c.columnDef];
              }
            };
            this.columns.push(mhd)
          }
          );

          this.displayedColumns = this.columns.map(c => c.columnDef);
          this.displayedColumns.push('icon')

          this.dataSource = new MatTableDataSource(this.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('this.columns', this.displayedColumns);

        })
  }

  private getDataOfReport() {

    //debugger
    let body = {
      termId: this.termId, userId: this.userId
    }

    this.mainGridReport.getDataOfReport(body)
      .subscribe(
        (sucsess) => {

          console.log('rows', JSON.parse(sucsess));
          this.result = JSON.parse(sucsess)
          this.getColumnsOfReport();

        })
  }

  private save(message: boolean,textMessage?:string,mode?:any) {
    //debugger
    this.uncalculatedColumns = []
    this.dataOfUnCalculatedColumns = []
    this.columns.forEach(eachuncalculatedColumns => {

      this.uncalculatedColumns.push(eachuncalculatedColumns.columnDef)


    });
    this.uncalculatedColumns.shift();
    this.uncalculatedColumns.unshift("courseId")
    this.uncalculatedColumns.unshift("termId")
    this.uncalculatedColumns.unshift("userId")
    console.log(' this.uncalculatedColumns', this.uncalculatedColumns)
    console.log('this.result', this.result)
    this.result.forEach(eachRowsOFData => {
      this.uncalculatedColumns.forEach(eachuncalculatedColumns => {
        //         if (eachRowsOFData.CourseName) {

        //    eachRowsOFData.CourseName= eachRowsOFData.courseId
        // }

        this.dataOfUnCalculatedColumns.push(eachRowsOFData[eachuncalculatedColumns])

      });

      this.deleteQuery = `delete from courseValue
        where userid=`+ this.userId + ` and termid=` + this.termId
      if (this.insertQuery) {
        this.insertQuery += `
INSERT INTO courseValue (`+
          this.uncalculatedColumns
          + `)VALUES (`
          + this.dataOfUnCalculatedColumns + `)`
      }
      else {
        this.insertQuery = `
INSERT INTO courseValue (`+
          this.uncalculatedColumns
          + `)VALUES (`
          + this.dataOfUnCalculatedColumns + `)`
      }
      this.dataOfUnCalculatedColumns = [];
    });
    this.attachmentEndScript=`Declare @Q nvarchar(max)
    Set @Q = ''
    
    Select @Q += 'Declare @' + columnName + ' decimal(38,20)
    '
    From columnDescription
    Where isCourse = 1
    Order By id
    
    Set @Q += '
    Select'
    
    Select @Q += '
      @' + columnName + ' = SUM(' + columnName + '),'
    From columnDescription
    Where isCourse = 1
    Order By id
    
    Set @Q = SUBSTRING(@Q,1,LEN(@Q)-1)
    Set @Q += '
    From courseValue
    Where userid =`+this.userId+`  And termid =`+this.termId+` 
    
    Update totalValue Set'
    
    Select @Q += '
      ' + columnName + ' = @' + columnName + ','
    From columnDescription
    Where isCourse = 1
    Order By id
    
    Set @Q = SUBSTRING(@Q,1,LEN(@Q)-1)
    Set @Q += '
    Where userid =`+this.userId+`  And termid =`+this.termId+` 
    
    'Exec(@Q)`



    console.log('this.dataOfUnCalculatedColumns', this.dataOfUnCalculatedColumns)
    console.log('result', this.result)
    console.log('columns', this.columns)
    let body
    if (this.result.length == 0) {
      body = {
        script: this.deleteQuery = `delete from courseValue
        where userid=`+ this.userId + ` and termid=` + this.termId + this.attachmentEndScript
      }
    }
    else {
      body = {
        script: this.deleteQuery + this.insertQuery +this.attachmentEndScript
      }
    }

    console.log('body', body)

    this.mainGridReport.saveDataOfReport(body)
      .subscribe(
        (sucsess) => {
          this.deleteQuery = "";
          this.insertQuery = "";
          if (message) {
            this.commonService.showEventMessage(textMessage?textMessage:"داده ها با موفقیت ذخیره شد", 900)
          }
          debugger
          if(mode=="addRow"){
            this.displayedColumns = null
            this.dataSource = null;
            this.columns = [];
            this.getDataOfReport();
            this.newRowObj = {};
          }
          else{
            if (this.result) {
              this.result.forEach(eachRowsOfTable => {
                if (eachRowsOfTable.changed) {
                  eachRowsOfTable.changed=false
                }
              });
            }
          }
       
      
         
          //debugger
          this.commonService.showTotalValueTable=true;
        });
    (error) => {
      this.deleteQuery = "";
      this.insertQuery = "";
      this.commonService.showEventMessage("داده ها با موفقیت ذخیره نشد-خطا!")
      this.getDataOfReport();


    }

  }
  ngDoCheck(){
    if (this.result) {
      this.result.forEach(eachRowsOfTable => {
        if (eachRowsOfTable.changed) {
          this.commonService.showTotalValueTable=false;
        }
      });
    }
   
  }
  addRow() {
    let textMessage
    debugger
    if (this.result) {
      this.result.forEach(eachRowsOfTable => {
        if (eachRowsOfTable.changed) {
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
      this.save(true,textMessage,"addRow")
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
    this.save(true);
  }

  private getCourseList() {
    this.mainGridReport.getCourseList().subscribe(
      (success) => {
        this.coursesList = JSON.parse(success);
      },
      (error) => {
        this.commonService.showEventMessage("خطایی در دریافت لیست دروس رخ داده یا ارتباط با سرور قطع است")

      }
    )
  }
  private getTermList() {
    this.mainGridReport.getTermList().subscribe(
      (success) => {
        this.termList = JSON.parse(success);


        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.termList.slice())
          );

      },
      (error) => {
        this.commonService.showEventMessage("خطایی در دریافت لیست دروس رخ داده یا ارتباط با سرور قطع است")

      }
    )
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

}
