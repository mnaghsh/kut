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
import { ContractSignituresService } from 'src/app/services/contractSignitures/contractSignituresService';
import { config } from 'rxjs';
import { ConfirmComponent } from '../confirm/confirm.component';
import { CategoryComponent } from '../category/category.component';
import { isFactory } from '@angular/core/src/render3/interfaces/injector';

@Component({
  selector: 'app-contractSignitures',
  templateUrl: './contractSignitures.html',
  styleUrls: ['./contractSignitures.scss']
})
export class ContractSignituresComponent implements OnInit {
  userId: number;
  sig1: boolean;
  sig2: boolean;
  sig3: boolean;
  sig4: boolean;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['code', 'fullName', 'signiture1', 'signiture2', 'signiture3', 'signiture4', 'reasonForRejection'];
  getSigningContractObj: any;
  getcontractSignitureObj: any;
  changedSignitures = [];
  changedRows: any[];
  categoryName = "انتخاب نظام آموزشی";
  departmentId = -1;
  constructor(
    private configService: ConfigService,
    public commonService: CommonService,
    private dialog: MatDialog,
    private signingContract: SigningContractService,
    private contractSigniture: ContractSignituresService,
    private myRoute: Router) {
    this.sig1 = true
    this.sig2 = true
    this.sig3 = true
    this.sig4 = true
  }
  ngOnInit() {
    this.contractSignitures();
  }


  private getSigningContract() {
   
    this.commonService.loading = true;
    this.signingContract.getSigningContract().subscribe(
      (success) => {
        this.getSigningContractObj = JSON.parse(success)
        console.log('  this.getSigningConturactObj', this.getSigningContractObj)

        this.getSigningContractObj.forEach(eachSigningContractObj => {
          debugger
          let onlineUser = this.commonService.activeUser[0]
          this.dataSource = new MatTableDataSource(null);
          if (eachSigningContractObj.teacherId == onlineUser.id) {
            switch (eachSigningContractObj.signitureNumber) {
              case 1:
                this.sig1 = false

                let signitureLevelArray1 = []
                for (let i = 0; i < this.getcontractSignitureObj.length; i++) {
                  if (this.getcontractSignitureObj[i].signiture1 == null
                    && this.getcontractSignitureObj[i].department == this.departmentId
                  ) {
                    signitureLevelArray1.push(this.getcontractSignitureObj[i]);
                  }
                }
                this.dataSource = new MatTableDataSource(signitureLevelArray1);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                break;
              case 2:
                let signitureLevelArray2 = []
                let mhd = [];
                for (let i = 0; i < this.getcontractSignitureObj.length; i++) {
                  if (this.getcontractSignitureObj[i].signiture2 != null
                    && this.getcontractSignitureObj[i].department == this.departmentId
                  ) {

                    signitureLevelArray2.push(this.getcontractSignitureObj[i]);

                  }


                }
                this.dataSource = new MatTableDataSource(signitureLevelArray2);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.sig2 = false
                break;
              case 3:
                //debugger
                let signitureLevelArray3 = []
                for (let i = 0; i < this.getcontractSignitureObj.length; i++) {
                  if (
                    //this.getcontractSignitureObj[i].signiture3 == null
                    this.getcontractSignitureObj[i].signiture3 != null
                    && this.getcontractSignitureObj[i].department == this.departmentId
                    //&& this.getcontractSignitureObj[i].signiture1 != null
                  ) {

                    signitureLevelArray3.push(this.getcontractSignitureObj[i]);

                  }
                }
                this.dataSource = new MatTableDataSource(signitureLevelArray3);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.sig3 = false
                break;
              case 4:
                let signitureLevelArray4 = []


                this.getcontractSignitureObj.forEach(eachContractSigniture => {
                  if (
                    // eachContractSigniture.signiture4==null
                    eachContractSigniture.signiture4 != null
                    && eachContractSigniture.department == this.departmentId
                  ) {
                    signitureLevelArray4.push(eachContractSigniture);
                  }
                });

                this.dataSource = new MatTableDataSource(signitureLevelArray4);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.sig4 = false
                break;
              default:
                this.dataSource = new MatTableDataSource(null);
                break;
            }
          }
          this.commonService.loading = false;
        }
        );
        this.commonService.loading = false;
      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
        this.commonService.loading = false;
      }
    )
  }

  public contractSignitures() {
    this.commonService.loading = true;
    this.contractSigniture.getContractSignitures(this.commonService.termId).subscribe(
      (success) => {
        this.getcontractSignitureObj = JSON.parse(success)
        this.dataSource = new MatTableDataSource(this.getcontractSignitureObj);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.commonService.loading = false;
        this.getSigningContract();
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
    const dialogRef = this.dialog.open(TeacherComponent, {
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
    debugger
    let updateQuery
    this.changedRows = []
    this.getcontractSignitureObj.forEach(eachContractSigniture => {
      if (eachContractSigniture.changed == true) {
        this.commonService.loading = true;
        this.changedRows.push(eachContractSigniture);
        if (eachContractSigniture.reasonForRejection != "" && eachContractSigniture.reasonForRejection != null) {

          const dialogRef = this.dialog.open(ConfirmComponent, {

            data: {
              text: " در صورت پر کردن 'دلیل عدم تایید برای استاد " + eachContractSigniture.fullName + " همه ی امضاهای برای این استاد حذف میگردند.آیا مطمئن هستید؟ ",
            }
          });
          dialogRef.afterClosed().subscribe(
            (data) => {
              //debugger
              if (data == 1) {
                updateQuery = `update contractSignitures 
                set signiture1=`+ null +
                  `, signiture2=` + null +
                  `, signiture3=` + null +
                  `, signiture4=` + null +
                  `, reasonForRejection='` + eachContractSigniture.reasonForRejection +
                  `'  where teacherId=` + eachContractSigniture.teacherId +
                  ` and termId=` + eachContractSigniture.termId
                this.sendToServer(updateQuery)

              }
              else {
                eachContractSigniture.reasonForRejection = ""
                updateQuery = `update contractSignitures 
                set signiture1=`+ Number(eachContractSigniture.signiture1) +
                  `, signiture2=` + Number(eachContractSigniture.signiture2) +
                  `, signiture3=` + Number(eachContractSigniture.signiture3) +
                  `, signiture4=` + Number(eachContractSigniture.signiture4) +
                  `, reasonForRejection='` + eachContractSigniture.reasonForRejection +
                  `'  where teacherId=` + eachContractSigniture.teacherId +
                  ` and termId=` + eachContractSigniture.termId
                this.sendToServer(updateQuery)
                this.commonService.loading = false;
              }
              this.commonService.loading = false;

            }

          )


        }
        else {
          updateQuery = `update contractSignitures 
          set signiture1=`+ Number(eachContractSigniture.signiture1) +
            `, signiture2=` + Number(eachContractSigniture.signiture2) +
            `, signiture3=` + Number(eachContractSigniture.signiture3) +
            `, signiture4=` + Number(eachContractSigniture.signiture4) +
            `, reasonForRejection='` + eachContractSigniture.reasonForRejection +
            `'  where teacherId=` + eachContractSigniture.teacherId +
            ` and termId=` + eachContractSigniture.termId
          this.sendToServer(updateQuery)
          this.commonService.loading = false;
        }

        console.log('getcontractSignitureObj', updateQuery)


      }
    });

  }

  private sendToServer(updateQuery) {
    let body = {
      script: updateQuery
    }
    console.log('body', body)
    this.contractSigniture.postContractSignitures(body).subscribe(
      (success) => {
        this.getSigningContract();
        this.commonService.showEventMessage("عملیات با موفقیت ذخیره شد")
        this.contractSignitures();

      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")

      }
    )
  }
  private changeSignitures(row) {
    row.changed = true
    if (this.changedSignitures.length == 0) {
      this.changedSignitures.push(row)
    }



    else {
      this.changedSignitures.forEach(element => {
        if (element = row) {
          this.changedSignitures.splice(element, 1)
          this.changedSignitures.push(row)
        }
        else {
          this.changedSignitures.push(row)
        }
      });



    }

    console.log('hhhh', this.changedSignitures)

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
          this.departmentId = data.x_
          this.getSigningContract();
          //this.userId = data.id;
          // this.categoryName = data.fullName;
          //this.firstName=data.firstName;
          //this.lastName=data.lastName;
          // this.displayedColumns = null
          //this.dataSource = null;
          //this.columns = [];
          //this.showCourseValueTable = true
          //this.commonService.reportUserId = this.userId;
        }
      }
    )
  }
}