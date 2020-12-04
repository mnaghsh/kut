import { ConfigService } from '../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { TeacherService } from 'src/app/services/teacher/teacherService';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @ViewChild(MatSort) sort: MatSort;
  displayName: string;
  description: string;
  mhd;
  displayedColumns: string[] = ['code','fullName'];
  dataSource: MatTableDataSource<any>;
  constructor(private configService: ConfigService,
    public commonService:CommonService,
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
    let localUsers=[]
    this.commonService.teacherList.forEach(eachUser => {
      if(eachUser.haveAccount==1){
         localUsers.push(eachUser)
      }
    });
    this.commonService.usersList=localUsers;
        this.dataSource = new MatTableDataSource( this.commonService.usersList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  private selectTeacher(row){
    this.dialogRef.close(row)
//////debugger
  }


}