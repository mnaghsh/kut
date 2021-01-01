import { ConfigService } from '../../services/config.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainGridReportService } from 'src/app/services/mainGridReport/mainGridReport';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';
import { totalMainGridReportService } from 'src/app/services/TotalmainGridReport/totalMainGridReport';
import { Router } from '@angular/router';

export interface Term {
  id: number;
  name: string;
}
@Component({
  selector: 'app-totalMainGridReport',
  templateUrl: './totalMainGridReport.component.html',
  styleUrls: ['./totalMainGridReport.component.scss']
})
export class TotalMainGridReportComponent implements OnInit {

  counter: boolean =false;
  options: Term[] = [
    { id: 1, name: 'Mary' },
    { id: 2, name: 'Shelley' },
    { id: 3, name: 'Igor' }
  ];

  martabe = [ 
    {value: 1, viewValue: 'مربی آموزشیار'},
    {value: 2, viewValue: 'مربی'},
    {value: 3, viewValue: 'استادیار'},
    {value: 4, viewValue: 'دانشیار'},
    {value: 5, viewValue: 'استاد'},
    {value: 6, viewValue: 'حق التدریس'},

  ];

  state = [ 
    {value: 1, viewValue: 'عادی'},
    {value: 2, viewValue: 'مدعو'},
    {value: 3, viewValue: 'مامور'},

  ];
 
  post = [
    {value: 1, viewValue: 'رئیس دانشگاه'},
    {value: 2, viewValue: 'معاون دانشگاه'},
    {value: 3, viewValue: 'رئیس دانشکده'},
    {value: 4, viewValue: 'معاون دانشکده'},
    {value: 5, viewValue: 'مدیر امور پژوهشی و فناوری'},
    {value: 6, viewValue: 'مدیر امور فرهنگی و اجتماعی'},
    {value: 7, viewValue: 'مدیر امور آموزشی و تحصیلات تکمیلی'},
    {value: 8, viewValue: 'سرپرست اداره فناوری اطلاعات و خدمات رایانه ای'},
    {value: 9, viewValue: 'سرپرست گروه نظارت و ارزیابی و تضمین کیفیت'},
    {value: 10, viewValue: 'مدیر گروه آموزشی با تحصیلات تکمیلی '},
    {value: 11, viewValue: 'مدیر گروه بدون تحصیلات تکمیلی'},
    {value: 12, viewValue: 'بدون پست'},
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  myControl = new FormControl();
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [];
  newRowObj = {}
  dataSource: MatTableDataSource<any>;
  columns = [];
  result = [];
  uncalculatedColumns = [];
  dataOfUnCalculatedColumns = [];
  insertQuery: string;
  deleteQuery: string;
  //coursesList: any;
  termList: any;
  termId;
  userId: number
  @Input()
  inputedUserId: any;
  filteredOptions: Observable<Term[]>;
  showSaveBtn: boolean;
  //showCourseValueTable = false;
  fullName = "انتخاب استاد"
  showAddRow = false;
  attachmentEndScript: string;
  nullRresult = false
  clonedUncalculatedColumns: any;
  clonedResult: any;


  constructor(private configService: ConfigService,
    private totalMainGridReportService: totalMainGridReportService,
    private dialog: MatDialog,
    private myRoute: Router,
    public commonService: CommonService) {

  }
  emiters() {
    this.commonService.saveTotalMainGrid.subscribe({
      next: (event: any) => {
        //debugger
        if(this.counter==false){
         // this.save(true)
        }
       
          ;
      }
    })
    this.commonService.rollback.subscribe({
      next: (event: any) => {
        //debugger
        if (event = 2) {
        //  this.replaceNewData();
        }

        ;
      }
    })
  }

  ngOnInit() {

    ////debugger
    this.termId = this.commonService.termId;
    this.userId = this.commonService.reportUserId;
    this.getDataOfReport();
    this.emiters();
    //this.getTermList()
  }
  private replaceNewData() {
    this.displayedColumns = null
    this.dataSource = null;
    this.columns = [];
    this.getDataOfReport();
    this.newRowObj = {};
    this.commonService.showSaveBtnTotal = false;
  }
  ngOnDestroy() {
    if (this.result) {
      this.result.forEach(eachRowsOfTable => {
        if (eachRowsOfTable.changed) {
          this.commonService.showEventMessage(" برخی ردیف ها تغییر یافته ولی ذخیره نشدند")
        }
      });
    }
  }
  ngDoCheck() {
    if (this.columns == undefined) {
      //////debugger
    }
  }
  private getColumnsOfReport() {

    this.totalMainGridReportService.getColumnsOfTotalReport()
      .subscribe(
        (sucsess) => {
          //////debugger
          console.log('jafaricolumns', JSON.parse(sucsess));

          let result = JSON.parse(sucsess)
          result.forEach(eachColumns => {

            let mhd = {

              columnDef: eachColumns['columnName'],
              label: eachColumns['displayName'],
              cell: (row, c) => {

                return row[c.columnDef];
              }
            };
            //////debugger
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

    //////debugger
    let body = {
      termId: this.termId, userId: this.userId
    }

    this.totalMainGridReportService.getTotalDataOfReport(body)
      .subscribe(
        (sucsess) => {
          //////debugger
          this.result = JSON.parse(sucsess)

          if (this.result.length == 0) {
            this.getColumnsOfReport();
            this.showAddRow = true;

          }
          else {
            this.getColumnsOfReport();
            this.showAddRow = false;
          }


        })
  }

  private save(message?: boolean, textMessage?: string, mode?: any) {
//debugger
this.nullRresult = false
    if (this.newRowObj) {
      if (!(this.newRowObj === undefined || this.newRowObj === null || Object.keys(this.newRowObj).length === 0)) {
        console.log(' this.mhd', this.newRowObj)
        this.newRowObj['userId'] = this.userId
        this.newRowObj['termId'] = this.termId
        this.result = this.result.concat([this.newRowObj])
      }
      mode = "addRow"
    }

    this.uncalculatedColumns = []
    this.dataOfUnCalculatedColumns = []

    this.columns.forEach(eachuncalculatedColumns => {
      this.uncalculatedColumns.push(eachuncalculatedColumns.columnDef)
    });
    this.uncalculatedColumns.unshift("termId")
    this.uncalculatedColumns.unshift("userId")
    console.log(' this.uncalculatedColumns', this.uncalculatedColumns)
    console.log('this.result', this.result)
    //debugger
    this.clonedResult = JSON.stringify(this.result)
    this.clonedUncalculatedColumns = JSON.stringify(this.uncalculatedColumns)
    this.result.forEach(eachRowsOFData => {
      this.uncalculatedColumns.forEach(eachuncalculatedColumns => {

        this.dataOfUnCalculatedColumns.push(eachRowsOFData[eachuncalculatedColumns])

      });

      this.deleteQuery = `delete from totalValue
        where userid=`+ this.userId + ` and termid=` + this.termId
      if (this.insertQuery) {
        this.insertQuery += `
INSERT INTO totalValue (`+
          this.uncalculatedColumns
          + `)VALUES (`
          + this.dataOfUnCalculatedColumns + `)`
      }
      else {
        this.insertQuery = `
INSERT INTO totalValue (`+
          this.uncalculatedColumns
          + `)VALUES (`
          + this.dataOfUnCalculatedColumns + `)`
      }
      this.dataOfUnCalculatedColumns = [];
    });
    // if(this.insertQuery!=undefined||this.insertQuery==""){
    this.attachmentEndScript = `Declare @Q nvarchar(max)
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
    Where userid =`+ this.userId + `  And termid =` + this.termId + ` 
    
    Update totalValue Set'
    
    Select @Q += '
    ' + columnName + ' = isnull(@' + columnName + ',0),'
    From columnDescription
    Where isCourse = 1
    Order By id
    
    Set @Q = SUBSTRING(@Q,1,LEN(@Q)-1)
    Set @Q += '
    Where userid =`+ this.userId + `  And termid =` + this.termId + ` 
    
    'Exec(@Q)`
    // }
    // else{
    //   this.attachmentEndScript=""
    // }
    console.log('this.dataOfUnCalculatedColumns', this.dataOfUnCalculatedColumns)
    console.log('result', this.result)
    //console.log('columns', this.columns)
    let body
    if (this.result.length == 0) {
      body = {
        script: this.deleteQuery = `delete from totalValue
        where userid=`+ this.userId + ` and termid=` + this.termId + this.attachmentEndScript
      }
    }
    else {
      body = {
        script: this.deleteQuery + this.insertQuery + this.attachmentEndScript
      }
    }
    this.setNullResult()
    console.log('body', body)
    //debugger
    this.commonService.loading = true;
    //window.scrollTo(0, 0)
    if (this.nullRresult == false) {
      this.counter=true;
      this.totalMainGridReportService.saveDataOfTotalReport(body)
        .subscribe(
          (sucsess) => {
            this.deleteQuery = "";
            this.insertQuery = "";
            if (message) {
              this.commonService.showEventMessage("داده ها با موفقیت ذخیره شد", 2000)
            }

            // if (mode == "addRow") {
            this.displayedColumns = null
            this.dataSource = null;
            this.columns = [];
            this.getDataOfReport();
            this.newRowObj = {};
            this.commonService.showSaveBtnTotal = false;
            this.commonService.loading = false;
          //  this.myRoute.navigate(['report/mainGridReport']);

          });
      (error) => {
        this.deleteQuery = "";
        this.insertQuery = "";
        this.commonService.showEventMessage("داده ها با موفقیت ذخیره نشد-خطا!")
        this.getDataOfReport();
        this.commonService.loading = false;
        

      }
    }
    else {
      this.deleteQuery = "";
      this.insertQuery = "";
      this.commonService.showEventMessage("حتما موارد ستاره دار را تکمیل کنید")
      this.commonService.loading = false;
    }
  }
  addRow() {
    ////////////////debugger
    // let tmp = this.newRowObj[Object.keys(this.newRowObj)[0]]
    if (!(this.newRowObj === undefined || this.newRowObj === null || Object.keys(this.newRowObj).length === 0)) {
      console.log(' this.mhd', this.newRowObj)
      this.newRowObj['userId'] = this.userId
      this.newRowObj['termId'] = this.termId
      //this.newRowObj['courseId'] = 3
      this.result = this.result.concat([this.newRowObj])
      // this.save(true)
    }
  }
  deleteRow(row) {
    ////debugger
    this.result.splice(0, 1);
    // this.result = this.result.concat([this.newRowObj])
    this.dataSource = new MatTableDataSource(this.result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('resuletAfterDel', this.result)
    this.commonService.showSaveBtnTotal = true
    //this.save(true);
  }


  displayFn(user?: Term): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Term[] {
    const filterValue = name.toLowerCase();
    return this.termList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private btnChooseTeacher() {
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
        // this.showCourseValueTable = true
        this.getDataOfReport();

      }
    )
  }
  private setNullResult() {
    this.result.forEach(eachItemDependentToCourse => {
      for (var i in eachItemDependentToCourse) {
        if (eachItemDependentToCourse[i] == null) {
          this.nullRresult = true;
          break;
        }
      }
    });
    //debugger
    JSON.parse(this.clonedResult).forEach(eachRowsOFData => {
      JSON.parse(this.clonedUncalculatedColumns).forEach(eachuncalculatedColumns => {
        if (eachRowsOFData[eachuncalculatedColumns] = null || eachRowsOFData[eachuncalculatedColumns] == undefined) {
          this.nullRresult = true;
        }
      });
    });
  }

}
