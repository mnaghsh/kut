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
import { SigningContractForCalculationUnitsService } from 'src/app/services/signingContractForCalculationUnits/signingContractForCalculationUnitsService';

@Component({
  selector: 'app-delegationSignitureForCalculationUnits',
  templateUrl: './delegationSignitureForCalculationUnits.component.html',
  styleUrls: ['./delegationSignitureForCalculationUnits.component.scss']
})
export class DelegationSignitureForCalculationUnitsComponent implements OnInit {
  userId: number;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['signitureNumber', 'fullName', 'post'];
  getSigningContractObj: any;
  constructor(
    private configService: ConfigService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private SigningContractForCalculationUnitsService: SigningContractForCalculationUnitsService,
    private myRoute: Router) {

  }
  ngOnInit() {
    this.getSigningContract();
  }

  private getSigningContract() {
    this.commonService.loading = true;
    this.SigningContractForCalculationUnitsService.getSigningContractForCalculationUnits().subscribe(
      (success) => {
        this.getSigningContractObj = JSON.parse(success)
        this.dataSource = new MatTableDataSource(this.getSigningContractObj);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.commonService.loading = false;         
        
      },
      (error)=>{
        this.commonService.showEventMessage( "خطایی به وجود آمده یا ارتباط با سرور قطع است"  )
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

  private saveChanges(){
    this.commonService.loading = true;
  let insertScript="";
    let deleteScript=`delete from signingContractForCalculaionUnits;`
this.getSigningContractObj.forEach(eachRowsOFData => {
let dataOfUnCalculatedColumns=[]
  dataOfUnCalculatedColumns.push(eachRowsOFData['signitureNumber'])
  dataOfUnCalculatedColumns.push(eachRowsOFData['teacherId'])
  dataOfUnCalculatedColumns.push(`'`+eachRowsOFData['post']+`'`)
  console.log('dataOfUnCalculatedColumns',dataOfUnCalculatedColumns)

   insertScript+=`
    
      insert into signingContractForCalculaionUnits (signitureNumber,teacherId,post)
      values(`+dataOfUnCalculatedColumns+`)`
      console.log('insertScript',insertScript)

})

  
    let body = {
      script: deleteScript + insertScript
    }
 
    console.log('body',body)   
    this.SigningContractForCalculationUnitsService.postSigningContractForCalculationUnits(body).subscribe(
       (success) => {
        this.getSigningContract();
        this.commonService.showEventMessage( "عملیات با موفقیت ذخیره شد"  )
           
        
      },
      (error)=>{
        this.commonService.showEventMessage( "خطایی به وجود آمده یا ارتباط با سرور قطع است"  )
      }
    )
  }

}