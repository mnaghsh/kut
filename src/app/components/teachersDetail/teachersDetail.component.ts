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
import { RegisterService } from 'src/app/services/register/registerService';
import { CategoryService } from 'src/app/services/category/categoryService';
import { TeacherDetailService } from 'src/app/services/teacherDetail/teacherDetailService';

export interface Term {
  id: number;
  name: string;
}
@Component({
  selector: 'app-teachersDetail',
  templateUrl: './teachersDetail.component.html',
  styleUrls: ['./teachersDetail.component.scss']
})
export class TeachersDetailComponent implements OnInit {
  //toppings = new FormControl();
  toppingList: string[] = this.commonService.categoryList
mhd:boolean;
  registerForm;
  fullName = "انتخاب استاد"
  myControl = new FormControl();
  departmentArray: string;

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
    { id: 5, name: "مدرس" },
  ];

  madrak = [
    {value: "1", viewValue: 'کارشناسی ارشد'},
    {value: "2", viewValue: 'دکتری'}
  ];
  userDetails: any;
  userId: any;
  firstName: any;
  lastName: any;
  displayedColumns: any;
  dataSource: any;
  columns: any[];
  showCourseValueTable: boolean;


  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private configService: ConfigService,
    public commonService: CommonService,
    public registerService: RegisterService,
    public teacherService: TeacherService,
    public categoryService: CategoryService,
    public teacherDetail: TeacherDetailService,
    private dialog: MatDialog,
    private myRoute: Router) {

    // this.registerForm = fb.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   //type: ['', Validators.required],
    //   //department: ['', Validators.required],
    //   code: ['', Validators.required]
    // });
  }

  ngOnInit() {

  }

  public save() {
    console.log('userDetails', this.userDetails)
    let body = {
   
     // user ? user.name : undefined;
      id                             : this.userId? this.userId :"",
      jensiat                        : this.userDetails.jensiat? this.userDetails.jensiat:"",
      kodamDaneshgahha               : this.userDetails.kodamDaneshgahha? this.userDetails.kodamDaneshgahha:"",
      mahaleAkhzAkharinMadrak        : this.userDetails.mahaleAkhzAkharinMadrak? this.userDetails.mahaleAkhzAkharinMadrak:"",
      mahaleTavalod                  : this.userDetails.mahaleTavalod ? this.userDetails.mahaleTavalod:"",
      mobile                         : this.userDetails.mobile ? this.userDetails.mobile:"",
      namePedar                      : this.userDetails.namePedar ? this.userDetails.namePedar:"",
      neshaniVaTelephone             : this.userDetails.neshaniVaTelephone ? this.userDetails.neshaniVaTelephone:"",
      paye                           : this.userDetails.paye ? this.userDetails.paye:"",
      reshteTahsili                  : this.userDetails.reshteTahsili ? this.userDetails.reshteTahsili:"",
      rotbeElmi                      : this.userDetails.rotbeElmi  ? this.userDetails.rotbeElmi:"",
      saleAkhz                       : this.userDetails.saleAkhz ? this.userDetails.saleAkhz:"",
      saleSabeghe                    : this.userDetails.saleSabeghe  ? this.userDetails.saleSabeghe:"",
      shomareHesab                   : this.userDetails.shomareHesab  ? this.userDetails.shomareHesab:"",
      shomareMeli                    : this.userDetails.shomareMeli  ? this.userDetails.shomareMeli:"",
      shomareShenasname              : this.userDetails.shomareShenasname  ? this.userDetails.shomareShenasname:"",
     // taTarikh                       : this.userDetails.taTarikh,
      tarikhTavalod                  : this.userDetails.tarikhTavalod ? this.userDetails.tarikhTavalod:"",
      vaziateShoghli                 : this.userDetails.vaziateShoghli ? this.userDetails.vaziateShoghli:"",
      vaziateTaahol                  : this.userDetails.vaziateTaahol ? this.userDetails.vaziateTaahol:"",
      akharinMadrakTahsili           : this.userDetails.akharinMadrakTahsili ? this.userDetails.akharinMadrakTahsili:"",
      daneshkade           : this.userDetails.daneshkade ? this.userDetails.daneshkade:"",
      // madrakTahsili           : this.userDetails.madrakTahsili ? this.userDetails.madrakTahsili:"",
      gorohAmozeshi           : this.userDetails.gorohAmozeshi ? this.userDetails.gorohAmozeshi:""
      
    }
    console.log('body', body)
    this.commonService.loading = true;
    this.teacherDetail.saveTeacherDetail(body).subscribe(
      (data: any) => {

        this.commonService.showEventMessage("عملیات با موفقیت انجام شد")
        this.commonService.loading = false;
        
       

      }


      ,
      (error) => {
        this.commonService.showEventMessage("خطایی به وجود آمده یا ارتباط با سرور قطع است")
        this.commonService.loading = false;
      }
    )




  }


  public btnChooseTeacher() {
   
    //this.newRowObj = {};
    this.mhd=false
    const dialogRef = this.dialog.open(TeacherComponent, {
      width: "85%",
      height: "85%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.mhd=true;

          console.log('userDetails', data)
          this.userDetails = undefined;
          this.userDetails = data;
          this.userId = data.id;
          this.fullName = data.fullName;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.displayedColumns = null
          this.dataSource = null;
          this.columns = [];
          this.showCourseValueTable = true
          this.commonService.reportUserId = this.userId;
          switch (this.userDetails.akharinMadrakTahsili) {
            case "کارشناسی ارشد":
              this.userDetails.akharinMadrakTahsili="1"
              break;
            case "دکتری":
              this.userDetails.akharinMadrakTahsili="2"
              break;
      
          }
          //this.commonService.reportUserId;
        }
      }
    )
  }


}
