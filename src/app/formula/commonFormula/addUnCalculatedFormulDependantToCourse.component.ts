import { ConfigService } from '../../services/config.service';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnCalculatedDependantToCourseService } from 'src/app/services/unCalculatedDependantToCourse/un-calculated-dependant-to-course.service';
import { MatDialog } from '@angular/material';
import { CommonFormulaComponent } from './commonFormula.component';

export interface Grid {
  id: string;
  displayName: string;

}


@Component({
  selector: 'app-addUnCalculatedFormulDependantToCourse',
  templateUrl: './addUnCalculatedFormulDependantToCourse.component.html',
  styleUrls: ['./addUnCalculatedFormulDependantToCourse.component.scss']
})
export class AddUnCalculatedFormulDependantToCourseComponent implements OnInit {
  displayName: string;
  description: string;
  displayedColumns: string[] = ['id', 'displayName', 'description', 'icon'];
  dataSource: MatTableDataSource<Grid>;

  @ViewChild(MatPaginator,) paginator: MatPaginator;
  @ViewChild(MatSort,) sort: MatSort;

  constructor(private configService: ConfigService,
    private dialog: MatDialog,
    public commonService: CommonService,
    private UnCalculatedFormulDependantTOCourse: UnCalculatedDependantToCourseService
  ) {


  }

  btnAdd() {
    const dialogRef = this.dialog.open(CommonFormulaComponent, {
      // width: "30%",
      // height: "50%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        // if (data == 1) {
        this.ngOnInit()
        //}

      }
    )
  }


  ngOnInit() {
    this.getData()

  }

  getData() {
    this.commonService.loading=true
    this.UnCalculatedFormulDependantTOCourse.getUnCalculatedDependantToCourseServiceGrid()
      .subscribe(
        (sucsess) => {
          this.commonService.loading=false
          //JSON.parse(sucsess).length
          this.dataSource = new MatTableDataSource(JSON.parse(sucsess));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(JSON.parse(sucsess));
        }

      );

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRow(row) {
    //debugger
    this.UnCalculatedFormulDependantTOCourse.deleteUnCalculatedDependantToCourseServiceGrid(row.columnName.substr(1, 9999999999))
      .subscribe(
        (sucsess) => {
          this.getData()
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          let res = JSON.parse(sucsess);
          switch (res[0].response) {
            case "1":
              this.commonService.showEventMessage("حذف آیتم با موفقیت انجام شد")
              break;
            case "0":
              this.commonService.showEventMessage("این فرمول در فرمول دیگری استفاده شده است")
              break;

            default:
              break;
          }

        }

      ),
      (error) => {
        console.log(error);
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
      }
      ;


    console.log('delete row', row)
  }


}


