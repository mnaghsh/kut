import { ConfigService } from '../../services/config.service';
import { CommonService } from 'src/app/services/common.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { CalculatedFormulaComponent } from './calculatedFormula.component';
import { CalculatedDependantToCourseService } from 'src/app/services/CalculatedDependantToCourse/calculated-dependant-to-course.service';

export interface Grid {
  id: string;
  displayName: string;
 
}
/** Constants used to fill up our data base. */
// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

@Component({
  selector: 'app-addCalculatedFormulDependantToCourse',
  templateUrl: './addCalculatedFormulDependantToCourse.component.html',
  styleUrls: ['./addCalculatedFormulDependantToCourse.component.scss']
})
export class AddCalculatedFormulDependantToCourseComponent implements OnInit {
  displayName: string;
  description: string;
  displayedColumns: string[] = ['id', 'displayName','description','showFormula'];
  dataSource: MatTableDataSource<Grid>;

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort, ) sort: MatSort;

  constructor(private configService: ConfigService,
    private dialog: MatDialog,
    private commonService: CommonService,
    private CalculatedFormulDependantTOCourse: CalculatedDependantToCourseService
    ) {
 
  }

  btnAdd(){
    const dialogRef = this.dialog.open(CalculatedFormulaComponent, {
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
    
this.CalculatedFormulDependantTOCourse.getCalculatedDependantToCourseServiceGrid()
.subscribe(
  (sucsess)=>{
  
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
}

