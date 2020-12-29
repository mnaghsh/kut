import { ConfigService } from '../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainGridReportService } from 'src/app/services/mainGridReport/mainGridReport';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';
import { CoursesComponent } from 'src/app/components/courses/courses.component';

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
  myControl = new FormControl();
  options = [];
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
  showSaveBtn: boolean;
  errorMessage: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loginForm: FormGroup;
  nullRresult = false
  clonedUncalculatedColumns: any;
  clonedResult: any;
  firstTime = [
    { value: 1, viewValue: 'بلی' },
    { value: 2, viewValue: 'خیر' }
  ];
  // مقطع درس
  courseSection = [
    { value: 1, viewValue: 'کارشناسی' },
    { value: 2, viewValue: 'ارشد' },
    { value: 3, viewValue: 'دکتری' }
  ];

  courseType = [
    { value: 1, viewValue: 'پایه و تخصصی' },
    { value: 2, viewValue: 'آزمایشگاه' },
    { value: 3, viewValue: 'کارگاه' },
    { value: 4, viewValue: 'معرفی به استاد' },
    { value: 5, viewValue: 'داوری' },
    { value: 6, viewValue: 'پروژه' },
    { value: 7, viewValue: 'کارآموزی' },
    { value: 8, viewValue: 'سمینار' },
    { value: 9, viewValue: 'عمومی' },
  ];
  toppingList: string[] = ['بله',];
  courseSelected: boolean;
  constructor(private configService: ConfigService,
    private fb: FormBuilder,
    private mainGridReport: MainGridReportService,
    private dialog: MatDialog,
    public commonService: CommonService) {
    this.userId = 0;
    this.termId = this.commonService.termId;
    this.commonService.loading = true;

    this.loginForm = fb.group({
      aa: ['', Validators.required],
      //bb: ['', Validators.required],
      //cc: ['', Validators.required],
      // dd: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.coursesList = this.commonService.coursesList
    this.getDataOfReport();
    this.filterAutoCompelete();
  }

  private filterAutoCompelete() {
    //////debugger
    this.options = this.coursesList
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }
  private filter(value: string): string[] {
    //////debugger
    value = value['key']
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnDestroy() {
    if (this.commonService.showSaveBtn == true) {
      this.commonService.showEventMessage(" برخی ردیف ها تغییر یافته ولی ذخیره نشدند")
      this.commonService.showSaveBtn = false;
      this.courseSelected =false;
    }


    this.newRowObj = {};
  }

  private getColumnsOfReport() {
    this.commonService.loading = true;
    this.mainGridReport.getColumnsOfReport()
      .subscribe(
        (sucsess) => {
          this.commonService.loading = false;;
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
          console.log('this.this.result', this.result);
          for (let i = 0; i < this.result.length; i++) {
            if (this.result[i]['C4'] == 0) {
              this.result[i]['C4'] = 100;
            }

          }
          this.dataSource = new MatTableDataSource(this.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        })
  }

  private getDataOfReport() {

    ////////debugger
    let body = {
      termId: this.termId, userId: this.userId
    }
    this.commonService.loading = true;
    this.mainGridReport.getDataOfReport(body)
      .subscribe(
        (sucsess) => {
          //this.commonService.loading=0;
          console.log('rows', JSON.parse(sucsess));
          this.result = JSON.parse(sucsess)
          this.getColumnsOfReport();

        })
  }

  private save(message: boolean, textMessage?: string, mode?: any) {
    debugger
    this.nullRresult = false
   // if(this.courseSelected == true){

    
    if (this.newRowObj ) {
      if (!(this.newRowObj === undefined || this.newRowObj === null || Object.keys(this.newRowObj).length === 0)) {
        console.log(' this.mhd', this.newRowObj)
        this.newRowObj['userId'] = this.userId
        this.newRowObj['termId'] = this.termId
        //this.newRowObj['courseId'] = 3
        this.result = this.result.concat([this.newRowObj])
        //this.save(true,textMessage,"addRow")
        //////debugger
        // this.result.push(this.newRowObj)
        this.dataSource = new MatTableDataSource(this.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.newRowObj = {}

      }
      mode = "addRow"
    }
    //////debugger
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
    this.clonedResult = JSON.stringify(this.result)
    this.clonedUncalculatedColumns = JSON.stringify(this.uncalculatedColumns)
    this.result.forEach(eachRowsOFData => {
      this.uncalculatedColumns.forEach(eachuncalculatedColumns => {

        this.dataOfUnCalculatedColumns.push(eachRowsOFData[eachuncalculatedColumns])

      });

      this.deleteQuery = `delete from courseValue
        where userid=`+ this.userId + ` and termid=` + this.termId
      if (this.insertQuery) {

        // this.dataOfUnCalculatedColumns.forEach(eacheCells=> {
        //   if(eacheCells==undefined){

        //     eacheCells="0";
        //   }
        // });

        for (let i = 0; i < this.dataOfUnCalculatedColumns.length; i++) {
          if (this.dataOfUnCalculatedColumns[i] == undefined) {

            this.dataOfUnCalculatedColumns[i] = 0;
          }
          // if(this.dataOfUnCalculatedColumns[i]['CourseName']== undefined||this.dataOfUnCalculatedColumns[i]['CourseName']== null|| Object.keys(this.dataOfUnCalculatedColumns[i]['CourseName']).length === 0){
          //   this.courseSelected=false;
          //   this.commonService.showEventMessage("نام درس برای هیچکدام از ردیف ها نمیتواند خالی باشد")
          //   return
          // }

        }
        this.insertQuery += `
INSERT INTO courseValue (`+
          this.uncalculatedColumns
          + `)VALUES (`
          + this.dataOfUnCalculatedColumns + `)`
      }
      else {
        for (let i = 0; i < this.dataOfUnCalculatedColumns.length; i++) {
          if (this.dataOfUnCalculatedColumns[i] == undefined) {

            this.dataOfUnCalculatedColumns[i] = 0;
          }
          // if(this.dataOfUnCalculatedColumns[i]['CourseName']== undefined||this.dataOfUnCalculatedColumns[i]['CourseName']== null|| Object.keys(this.dataOfUnCalculatedColumns[i]['CourseName']).length === 0){
          //   this.courseSelected=false;
          //   this.commonService.showEventMessage("نام درس برای هیچکدام از ردیف ها نمیتواند خالی باشد")
          //   return
          // }

        }
        this.insertQuery = `
INSERT INTO courseValue (`+
          this.uncalculatedColumns
          + `)VALUES (`
          + this.dataOfUnCalculatedColumns + `)`
      }
      this.dataOfUnCalculatedColumns = [];
    });
    ////debugger
    // if (this.insertQuery != undefined && this.insertQuery != "") {

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

    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', this.dataOfUnCalculatedColumns)
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
        script: this.deleteQuery + this.insertQuery + this.attachmentEndScript
      }
    }

    this.setNullResult();

    this.commonService.loading = true;
    ////debugger
    console.log('body', body)
    // if (this.nullRresult == false) {
    this.mainGridReport.saveDataOfReport(body)
      .subscribe(
        (sucsess) => {
          body={};
          //this.commonService.loading=0;
          this.commonService.loading = false;
          this.deleteQuery = "";
          this.insertQuery = "";

          if (message) {
            ////debugger
            this.commonService.showEventMessage(textMessage ? textMessage : "داده ها با موفقیت ذخیره شد", 2000)
          }
          //ebugger
          // if(mode=="addRow"){
          this.displayedColumns = null
          this.dataSource = null;
          this.columns = [];
          this.getDataOfReport();
          this.newRowObj = {};
          this.commonService.showSaveBtn = false;
          this.commonService.showTotalValueTable = true;
          this.commonService.loading = false;
          this.commonService.saveTotalMainGrid.emit(null)
          this.courseSelected =false;
        }),
      (error) => {
        debugger;
        this.deleteQuery = "";
        this.insertQuery = "";
        body={};
        this.commonService.showEventMessage("داده ها با موفقیت ذخیره نشد-خطا!")
        this.getDataOfReport();
        this.commonService.loading = false;
        this.courseSelected =false;
      }
      body={};
    // }
    // else {
    //   this.deleteQuery = "";
    //   this.insertQuery = "";
    //   this.commonService.showEventMessage("حتما موارد ستاره دار را تکمیل کنید")
    //   this.commonService.loading = false;
    // }
  //  }
  //  else{
  //    this.commonService.showEventMessage("نام درس برای هیچکدام از ردیف ها نمیتواند خالی باشد")
   // }
  }
  private replaceNewData() {
    this.displayedColumns = null
    this.dataSource = null;
    this.columns = [];
    this.getDataOfReport();
    this.newRowObj = {};
    this.commonService.showSaveBtn = false;
    this.courseSelected =false;
    this.commonService.rollback.next(2);
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

  addRow() {
    let textMessage
    //////debugger
    if (this.result) {
      this.result.forEach(eachRowsOfTable => {
        if (this.commonService.showSaveBtn == true) {
          textMessage = " ردیف جدید با همه ی ردیف های در حال ویرایش ذخیره شدند "
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
      //////debugger
      // this.result.push(this.newRowObj)
      this.dataSource = new MatTableDataSource(this.result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.newRowObj = {}

    }
  }
  deleteRow(row) {

this.courseSelected=true;
    for (let i = 0; i < this.result.length; i++) {
      if (this.result[i].courseId == row.courseId) {
        this.result.splice(i, 1);
      }
    }
    this.dataSource = new MatTableDataSource(this.result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('resuletAfterDel', this.result)
    this.commonService.showSaveBtn = true
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
        if (data) {
          this.userId = data.id;
          this.fullName = data.fullName;
          this.displayedColumns = null
          this.dataSource = null;
          this.columns = [];
          this.showCourseValueTable = true
          this.getDataOfReport();
          this.commonService.reportUserId = this.userId;
      
        }

      }
    )
  }
  private chooseCourse(row) {
    this.selectedRow = row

    const dialogRef = this.dialog.open(CoursesComponent, {
      width: "85%",
      height: "85%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        if (data) {
          this.courseSelected = true;
          this.selectedRow.CourseName = data.name
          this.selectedRow.courseId = data.id
          this.commonService.showSaveBtn = true
        }
      }
    )
  }
}
