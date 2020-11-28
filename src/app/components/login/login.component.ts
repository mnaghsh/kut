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
import { CategoryService } from 'src/app/services/category/categoryService';
export interface Term {
  id: number;
  name: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  termId = 22;
  loginForm;
  termList: any;
  myControl = new FormControl();
  @ViewChild('username') username;
  @ViewChild('password') password;
  message: string;
  find = false;
  filteredOptions: Observable<Term[]>;
  connectToServer: any;


  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private mainGridReport: MainGridReportService,
    private configService: ConfigService,
    public commonService: CommonService,
    private teacherService: TeacherService,
    private categoryService: CategoryService,
    private myRoute: Router) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getTermList();
    this.getCourseList();
    this.getTeacherList();
    this.getCategoryList();
    this.commonService.termId = this.termId;
  }

  private getTermList() {
    this.mainGridReport.getTermList().subscribe(
      (success) => {
        this.termList = JSON.parse(success);
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.termList.slice())
          );

        this.termList.forEach(eachTerm => {
          if (eachTerm.id == this.commonService.termId) {
            this.commonService.termName = eachTerm.name;
          }
        });
        this.connectToServer = true;
      },
      (error) => {
        this.commonService.showEventMessage("خطایی در دریافت اطلاعات  رخ داده یا ارتباط با سرور قطع است")
        this.connectToServer = false;
      }
    )
  }
  changeTerm(termId) {
    ////debugger
    this.commonService.termId = termId;
    this.termList.forEach(eachTerm => {
      if (eachTerm.id == this.commonService.termId) {
        this.commonService.termName = eachTerm.name;
      }
    });
  }


  private _filter(name: string): Term[] {
    const filterValue = name.toLowerCase();

    return this.termList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public login() {
    if (this.loginForm.valid) {
      let body = {
        userName: this.loginForm.value.username,
        password: this.loginForm.value.password,
      }
      this.commonService.loading = true;
      this.configService.post("users", body).subscribe(
        (data: any) => {
         // debugger
          if(data=="[]"){
            this.message = 'نام کاربری یا کلمه عبور اشتباه است'
            this.commonService.loading = false;
            return;
          }
         
          this.commonService.loading = false;
          this.commonService.activeUser = JSON.parse(data)
          console.log(JSON.parse(data));
          data = JSON.parse(data);
          data.forEach(element => {
            if (element.username == this.loginForm.value.username) {
              this.auth.wasLoggedIn();
              this.myRoute.navigate(['report/mainGridReport']);
            }
            else {
              this.message = 'نام کاربری یا کلمه عبور اشتباه است'
            }
          });
        }
      )
    }
  }

  private getCourseList() {
    this.mainGridReport.getCourseList().subscribe(
      (success) => {
        this.commonService.coursesList = JSON.parse(success);
        this.connectToServer = true;
      },
      (error) => {
        this.commonService.showEventMessage("خطایی در دریافت لیست دروس رخ داده یا ارتباط با سرور قطع است")
        this.connectToServer = false;
      }
    )
  }

  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  private getTeacherList() {
    this.teacherService.getListOfTeachers().subscribe(
      (success) => {
        this.commonService.teacherList = JSON.parse(success)
        this.connectToServer = true;
      },
      (error) => {
        this.connectToServer = false;
      }
    )

  }

  private getCategoryList() {
    this.categoryService.getListOfcategorys().subscribe(
      (success) => {
        console.log('this.commonService.categoryList', JSON.parse(success));
        this.commonService.categoryList = JSON.parse(success)
        this.connectToServer = true;
      },
      (error) => {
        this.connectToServer = false;
      }
    )

  }

}
