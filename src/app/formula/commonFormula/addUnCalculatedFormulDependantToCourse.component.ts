import { ConfigService } from '../../services/config.service';
import { CommonService } from 'src/app/services/common.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
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
  displayedColumns: string[] = ['id', 'displayName','description'];
  dataSource: MatTableDataSource<Grid>;

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort, ) sort: MatSort;

  constructor(private configService: ConfigService,
    private dialog: MatDialog,
    public commonService: CommonService,
    private UnCalculatedFormulDependantTOCourse: UnCalculatedDependantToCourseService
    ) {


  }

  btnAdd(){
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
    
this.UnCalculatedFormulDependantTOCourse.getUnCalculatedDependantToCourseServiceGrid()
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


/** Builds and returns a new User. */
// function createNewUser(id: number) {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
  // private addCommonFormul() {
  //   let body = { Description: this.displayName, DisplayName: this.description }
  //   this.configService.post("addFormul", body).subscribe(
  //     (data) => {
  //       this.commonService.showEventMessage("فرمول با موفقیت ذخیره شد", 500000)

  //       console.log('data', data)
  //     },
  //     (error)=>{
  //       console.log('ere', error)
  //     }
  //   )
  // }



  // private addCalculatedFormul() {
  //   let body = { Description: "سی 1 ضربدر دو", DisplayName: "تعداد واحد نظری ضربدر 2", Formula: "((c1*1.13)+c1)*99" }
  //   this.configService.post("addCalculatedFormul", body).subscribe(
  //     (data) => {
  //       this.commonService.showEventMessage("فرمول با موفقیت ذخیره شد", 5000)
  //       console.log('data', data)
  //     }
  //   )
  // }
  // private getColumnDescriptions() {
  //   this.configService.get("ColumnDescriptions").subscribe(
  //     (data) => {
  //       console.log('data', data)
  //     }
  //   )
  // }

