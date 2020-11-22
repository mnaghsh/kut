import { ConfigService } from '../../../services/config.service';
import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
// import { CalculatedFormulaComponent } from './calculatedFormula.component';
import { CalculatedDependantToCourseService } from 'src/app/services/CalculatedDependantToCourse/calculated-dependant-to-course.service';
import { TotalCalculatedFormulaComponent } from './toalCalculatedFormula.component';
import { totalCalculatedService } from 'src/app/services/totalCalculated/totalCalculatedService';

export interface Grid {
  id: string;
  displayName: string;

}


@Component({
  selector: 'app-addTotalCalculatedFormul',
  templateUrl: './addTotalCalculatedFormul.component.html',
  styleUrls: ['./addTotalCalculatedFormul.component.scss']
})
export class AddTotalCalculatedFormulComponent implements OnInit {
  displayName: string;
  description: string;
  displayedColumns: string[] = ['id', 'displayName', 'description', 'showFormula', 'icon'];
  dataSource: MatTableDataSource<Grid>;

  @ViewChild(MatPaginator,) paginator: MatPaginator;
  @ViewChild(MatSort,) sort: MatSort;

  constructor(private configService: ConfigService,
    private dialog: MatDialog,
    public commonService: CommonService,
    private totalCalculatedService: totalCalculatedService
  ) {

  }

  btnAdd() {
    const dialogRef = this.dialog.open(TotalCalculatedFormulaComponent, {
      width: "85%",
      height: "85%",
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
    this.totalCalculatedService.getTotalCalculatedServiceGrid()
      .subscribe(
        (sucsess) => {
          this.commonService.loading=false
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
debugger
    this.totalCalculatedService.deleteTotalCalculatedServiceGrid(row.columnName.substr(1, 9999999999))
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


