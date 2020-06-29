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
  termId=3;
  loginForm;
  termList: any;
  myControl = new FormControl();
  @ViewChild('username') username;
  @ViewChild('password') password;
  message: string;
  find =false;
  filteredOptions: Observable<Term[]>;


  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private mainGridReport: MainGridReportService,
    private configService: ConfigService,
    private commonService:CommonService,
    private myRoute: Router) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
this.getTermList();
this.commonService.termId=this.termId;
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

      },
      (error) => {
        this.commonService.showEventMessage("خطایی در دریافت لیست دروس رخ داده یا ارتباط با سرور قطع است")

      }
    )
  }
  changeTerm(termId){
    debugger
    this.commonService.termId=termId;
  }


  private _filter(name: string): Term[] {
    const filterValue = name.toLowerCase();

    return this.termList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public login() {

  
    if (this.loginForm.valid) {


let body={
  userName:this.loginForm.value.username,
  password:this.loginForm.value.password,
}
// const httpOptions = {
//   headers: new HttpHeaders({
//      'Content-Type': 'application/json',
//     // 'Authorization': 'Basic ' + btoa('yourClientId' + ':' + 'yourClientSecret')
//   })
// };
// this.configService.post("addCalculatedFormul", body).subscribe(
      this.configService.post("users",body).subscribe(
        (data: any) => {
          console.log(JSON.parse(data));
          data=JSON.parse(data);
          data.forEach(element => {
            
            if (element.username == this.loginForm.value.username ) {

              this.auth.wasLoggedIn();
              this.myRoute.navigate(['report/mainGridReport']);
            }
            else {

              this.message = 'درست وارد کنید'
            }

          });
        }
      )

    }

  }
}
