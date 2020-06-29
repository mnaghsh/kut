import { ConfigService } from '../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { TeacherService } from 'src/app/services/teacher/teacherService';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayName: string;
  description: string;
  mhd;
  displayedColumns: string[] = ['fullName'];
  dataSource: MatTableDataSource<any>;
  constructor(private configService: ConfigService,
    public dialogRef: MatDialogRef<any>,
    private teacherService: TeacherService) {

    // this.addCommonFormul()
    // this.addCalculatedFormul();
    //  this.getColumnDescriptions();
  }

  ngOnInit() {
    this.getTeacherList();
  }
  private getTeacherList() {
    this.teacherService.getListOfTeachers().subscribe(
      (success) => {
        let result = JSON.parse(success)
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  private selectTeacher(row){
    this.dialogRef.close(row)
//debugger
  }


}
