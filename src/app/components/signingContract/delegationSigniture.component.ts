import { ConfigService } from './../../services/config.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { MainGridReportService } from 'src/app/services/mainGridReport/mainGridReport';
import { TeacherService } from 'src/app/services/teacher/teacherService';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TeacherComponent } from '../teacher/teacher.component';
import { SigningContractService } from 'src/app/services/signingContract/signingContractService';
import { CategoryComponent } from '../category/category.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-delegationSigniture',
  templateUrl: './delegationSigniture.component.html',
  styleUrls: ['./delegationSigniture.component.scss']
})
export class DelegationSignitureComponent implements OnInit {
  userId: number;
  //department: any;
  categoryName = "انتخاب گروه آموزشی";
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['signitureNumber', 'fullName', 'post'];
  getSigningContractObj: any;
  categoryId: any;
  constructor(
    private configService: ConfigService,
    public commonService: CommonService,
    private dialog: MatDialog,
    private signingContract: SigningContractService,
    private myRoute: Router) {

  }
  ngOnInit() {
    //this.getSigningContract();
  }

  public getSigningContract(department) {
    this.commonService.loading = true;
    let localSigningContract = [];
    this.signingContract.getSigningContract().subscribe(
      (success) => {
        this.getSigningContractObj = JSON.parse(success)
        this.getSigningContractObj.forEach(eachSigningContract => {
          if (eachSigningContract.department == department) {
                localSigningContract.push(eachSigningContract)
               }
          // JSON.parse(eachSigningContract.department).forEach(eachSigningContractObjSeprateDepartment => {
          //   if (eachSigningContractObjSeprateDepartment == department) {
          //     localSigningContract.push(eachSigningContract)
          //   }
          // });
          
        });
        this.getSigningContractObj = localSigningContract
        this.dataSource = new MatTableDataSource(this.getSigningContractObj);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.commonService.loading = false;

      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private btnChooseTeacher(row) {
    //this.newRowObj = {};
    const dialogRef = this.dialog.open(UsersComponent, {
      width: "85%",
      height: "85%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        row.teacherId = data.id;
        row.fullName = data.fullName;
      }
    )
  }

  public saveChanges() {
    this.commonService.loading = true;
    let insertScript = "";
    let deleteScript = `delete from signingContract where department = `+this.categoryId
    this.getSigningContractObj.forEach(eachRowsOFData => {
      let dataOfUnCalculatedColumns = []
      dataOfUnCalculatedColumns.push(eachRowsOFData['signitureNumber'])
      dataOfUnCalculatedColumns.push(eachRowsOFData['teacherId'])
      dataOfUnCalculatedColumns.push(`'` + eachRowsOFData['post'] + `'`)
      dataOfUnCalculatedColumns.push(this.categoryId)
      console.log('dataOfUnCalculatedColumns', dataOfUnCalculatedColumns)

      insertScript += `
    
      insert into signingContract (signitureNumber,teacherId,post,department)
      values(`+ dataOfUnCalculatedColumns + `)`
      console.log('insertScript', insertScript)

    })


    let body = {
      script: deleteScript + insertScript
    }

    console.log('body', body)
    this.signingContract.postSigningContract(body).subscribe(
      (success) => {
        this.getSigningContract( this.categoryId);
        this.commonService.showEventMessage("عملیات با موفقیت ذخیره شد")


      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
      }
    )
  }
  public btnChooseCategory() {
    //this.showCourseValueTable = false
    //this.newRowObj = {};
    const dialogRef = this.dialog.open(CategoryComponent, {
      width: "85%",
      height: "85%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          debugger
          this.categoryName = data.xDepartment_Farsi
          this.categoryId = data.x_
          this.getSigningContract(data.x_);
        }
      }
    )
  }
}
