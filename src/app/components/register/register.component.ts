import { ConfigService } from './../../services/config.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { CommonService } from 'src/app/services/common.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainGridReportService } from 'src/app/services/mainGridReport/mainGridReport';
import { TeacherService } from 'src/app/services/teacher/teacherService';
import { TeacherComponent } from '../teacher/teacher.component';
import { MatDialog } from '@angular/material';
export interface Term {
  id: number;
  name: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;
  fullName = "ویرایش کاربران قبلی"
  
  myControl = new FormControl();
  code: any;
  department: any;
  type: any;
  firstName: any;
  password: any;
  username: any;
  lastName: any;
  

  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private configService: ConfigService,
    public commonService: CommonService,
    private dialog: MatDialog,
    private myRoute: Router) {

    this.registerForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      type: ['', Validators.required],
      department: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  public saveData() {
//     debugger;
// if(this.code&&this.username&&this.password&&this.firstName&&this.lastName&&this.type&&this.department){
//   this.registerForm.valid=true;
// }

    if (this.registerForm.valid) {


      let body = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        type: this.registerForm.value.type,
        department: this.registerForm.value.department,
        code: this.registerForm.value.code,
      }

      this.commonService.loading = true;
      this.configService.post("register", body).subscribe(
        (data: any) => {
          if(data){
          this.commonService.loading = false;
          console.log(JSON.parse(data));
          data = JSON.parse(data);
          
            this.commonService.showEventMessage("عملیات با موفقیت انجام شد")
            this.commonService.loading = false;
        }
        
      },
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
        this.commonService.loading = false;
      }
      )
    

    }

  }


  // private getTeacherList() {
  //   this.teacherService.getListOfTeachers().subscribe(
  //     (success) => {
  //       this.commonService.teacherList= JSON.parse(success)

  //     }
  //   )

  // }
  private btnChooseUser() {
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
        this.fullName=data.fullName
        debugger
       
       this.registerForm = this.fb.group({
        username: [data.username, Validators.required],
        password: [data.password, Validators.required],
        firstName: [data.firstName, Validators.required],
        lastName: [data.lastName, Validators.required],
        type: [data.type, Validators.required],
        department: [data.department, Validators.required],
        code: [data.code, Validators.required]
      });
      }
    )
  }

}
