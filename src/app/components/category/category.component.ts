import { ConfigService } from '../../services/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { TeacherService } from 'src/app/services/teacher/teacherService';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  customCategoryList = [];
  @ViewChild(MatSort) sort: MatSort;
  displayName: string;
  description: string;

  mhd;
  displayedColumns: string[] = ['code', 'fullName'];
  dataSource: MatTableDataSource<any>;
  constructor(private configService: ConfigService,
    public commonService: CommonService,
    public dialogRef: MatDialogRef<any>,
    private teacherService: TeacherService) {
  }

  ngOnInit() {

    this.getCategoryList();
  }
  private getCategoryList() {

    //اگ یوزر از تایپ یک یا دو بود
    if (this.commonService.activeUser[0].type == 1 ||//admin
      this.commonService.activeUser[0].type == 2//moaven
    ) {//
      this.dataSource = new MatTableDataSource(this.commonService.categoryList);
    }
    else {
      JSON.parse(this.commonService.activeUser[0].department).forEach(eachDepartment => {
        console.log(eachDepartment)
        this.commonService.categoryList.forEach(eachCategoryItem => {
          console.log(Number(eachCategoryItem.x_))
          if (Number(eachCategoryItem.x_) == eachDepartment)
            this.customCategoryList.push(eachCategoryItem)
        });
        this.dataSource = new MatTableDataSource(this.customCategoryList);
      });
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  private selectCategory(row) {
    this.dialogRef.close(row)
  }


}
