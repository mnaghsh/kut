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
import { AllPersonsComponent } from '../allPersons/allPersons.component';
import { MatDialog } from '@angular/material';
import { RegisterService } from 'src/app/services/register/registerService';
import { CategoryService } from 'src/app/services/category/categoryService';
import { UsersComponent } from '../users/users.component';

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
  //toppings = new FormControl();
  toppingList: string[] = this.commonService.categoryList

  registerForm;
  fullName = "ویرایش کاربران قبلی"
  myControl = new FormControl();
  departmentArray: string;
  haveAccount:any;
  // code: any;
  // department: any;
  typeId: any;
  // firstName: any;
  // password: any;
  // username: any;
  // lastName: any;
  updateState: boolean;
  idOfUserForUpdate: any;
  typeList = [
    { id: 1, name: "ادمین" },
    { id: 2, name: "معاون" },
    { id: 3, name: "مدیرگروه" },
    { id: 4, name: " کارشناس" },
    // { id: 5, name: "مدرس" },
  ];
  backUpOfRegisterForm: any;
  department: any;


  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private configService: ConfigService,
    public commonService: CommonService,
    public registerService: RegisterService,
    public teacherService: TeacherService,
    public categoryService: CategoryService,
    private dialog: MatDialog,
    private myRoute: Router) {

    this.registerForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      //type: ['', Validators.required],
      //department: ['', Validators.required],
      code: ['', Validators.required],
      //haveAccount: ['', Validators.required]
      
    });
  }

  ngOnInit() {

  }


  public saveData() {
    //debugger
    if (this.registerForm.valid) {

      let body = {
        id: this.idOfUserForUpdate,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        type: this.typeId,
        //department: this.registerForm.value.department,
        department: this.departmentArray?this.departmentArray:this.department,
        code: this.registerForm.value.code,
        haveAccount: true
      }

      this.commonService.loading = true;
      //debugger
      console.log('registerBody',body);

      this.registerService.checkDuplicateUser({ username: this.registerForm.value.username }).subscribe(
        (data: any) => {
          // if(data){
          this.commonService.loading = false;
          console.log(JSON.parse(data));
          data = JSON.parse(data);

          //this.commonService.showEventMessage("عملیات با موفقیت انجام شد")
          this.commonService.loading = false;
          //this.idOfUserForUpdate = null;
          //this.updateState = false;
          if (data.length == 0 || this.updateState == true)//یعنی اگر کاربر قبلا وجود نداشت
          {
            this.registerService.insertUsers(body).subscribe(
              (data: any) => {
                // if(data){
                this.commonService.loading = false;
                console.log(JSON.parse(data));
                data = JSON.parse(data);
                this.commonService.showEventMessage("عملیات با موفقیت انجام شد")
                this.commonService.loading = false;
                this.idOfUserForUpdate = null;
                this.updateState = false;
                this.getTeacherList()
                this.getCategoryList()
                this.teacherService.getListOfTeachers().subscribe(
                  (success) => {
                    this.commonService.teacherList = JSON.parse(success)

                  },
                  (error) => {
                    this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
                  }
                )

this.resetFrom()
              }

              //  }
              ,
              (error) => {
                this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
                this.commonService.loading = false;
                this.idOfUserForUpdate = null;
                this.updateState = false;
                this.resetFrom()

              }
            )
          }
          else {
            this.commonService.showEventMessage("نام کاربری نباید تکراری باشد")
          }

        }

        //  }
        ,
        (error) => {
          this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
          this.commonService.loading = false;
          // this.idOfUserForUpdate = null;
          // this.updateState = false;
        }
      )



    }

  }




  public btnChooseUser() {

    const dialogRef = this.dialog.open(UsersComponent, {
      width: "85%",
      height: "85%",
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(

      (data) => {
        if (data) {
          console.log('mhds',data)
          if(data.id==this.commonService.activeUser[0].id||this.commonService.activeUser[0].type==1){
         // this.haveAccount=data.haveAccount;
          this.fullName = data.fullName
          this.idOfUserForUpdate = data.id
          this.updateState = true;
          this.registerForm = this.fb.group({
            username: [data.username, Validators.required],
            password: [data.password, Validators.required],
            firstName: [data.firstName, Validators.required],
            lastName: [data.lastName, Validators.required],
            // type: [data.type, Validators.required],
            department: [data.department, Validators.required],
            code: [data.code, Validators.required],
            //: [data.haveAccount, Validators.required]
          });

          this.typeId = data.type;
         this.department=data.department;
         
        }
        else{
          this.commonService.showEventMessage("شما دسترسی تغییر اطلاعات برای این کاربر را ندارید.")
        }
      }
    }
    )

  }
  resetFrom() {
    this.updateState = false;
    this.idOfUserForUpdate = null;
    this.fullName = "ویرایش کاربران قبلی";
    
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      //type: ['', Validators.required],
     // department: ['', Validators.required],
      code: ['', Validators.required],
     // haveAccount: ['', Validators.required]
      
    });}
  changeType(inputTypeId) {
    //debugger
    this.typeId = inputTypeId
  }
  closeSelect(selectedDepartments) {
    let localDepartmentArray = [];
    selectedDepartments.forEach(eachSelectedDepartments => {
      localDepartmentArray.push(Number(eachSelectedDepartments.x_))
    });
    this.departmentArray = '[' + String(localDepartmentArray) + ']'
    //debugger
  }

  private getTeacherList() {
    this.teacherService.getListOfTeachers().subscribe(
      (success) => {
        this.commonService.teacherList = JSON.parse(success)
       
      },
      (error) => {
        
      }
    )

  }

  private getCategoryList() {
    this.categoryService.getListOfcategorys().subscribe(
      (success) => {
        console.log('this.commonService.categoryList', JSON.parse(success));
        this.commonService.categoryList = JSON.parse(success)
      },
      (error) => {
      }
    )
    

  }



} 
