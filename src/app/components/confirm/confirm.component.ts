import { ConfigService } from '../../services/config.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeacherService } from 'src/app/services/teacher/teacherService';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  text:string;
  constructor(private configService: ConfigService,
    private commonService:CommonService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data
    ) {
this.text=data.text
  }

  ngOnInit() {
   
   
  }

  private selectAnswer(mode){
    if(mode==1)
    this.dialogRef.close(1)
    else{
      this.dialogRef.close(0)
    }

  }
 

}
