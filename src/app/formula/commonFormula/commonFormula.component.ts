import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-commonFormula',
  templateUrl: './commonFormula.component.html',
  styleUrls: ['./commonFormula.component.scss']
})
export class CommonFormulaComponent implements OnInit {
  displayName: string;
  description: string;
  constructor(private configService: ConfigService,
    public dialogRef: MatDialogRef<any>,
    public commonService: CommonService) {
    // this.addCommonFormul()
    // this.addCalculatedFormul();
    // this.getColumnDescriptions();
  }

  ngOnInit() {
  }

  public addCommonFormul() {
    let body = {DisplayName : this.displayName, Description: this.description }
    this.configService.post("addUnCalculatedFormulDependantToCourse", body).subscribe(
      (data) => {
        this.commonService.showEventMessage("فرمول با موفقیت ذخیره شد", 5000)

        console.log('data', data)
        this.dialogRef.close();
      },
      (error)=>{
        this.commonService.showEventMessage("فرمول با موفقیت ذخیره نشد", 5000)
        console.log('ere', error)
        this.dialogRef.close();
      }
    )
  
  }



  // private addCalculatedFormul() {
  //   let body = { Description: "سی 1 ضربدر دو", DisplayName: "تعداد واحد نظری ضربدر 2", Formula: "((c1*1.13)+c1)*99" }
  //   this.configService.post("addCalculatedFormul", body).subscribe(
  //     (data) => {
  //       this.commonService.showEventMessage("فرمول با موفقیت ذخیره شد", 5000)
  //       console.log('data', data)
  //     }
  //   )
  // }
  // private getColumnDescriptions() {
  //   this.configService.get("ColumnDescriptions").subscribe(
  //     (data) => {
  //       console.log('data', data)
  //     }
  //   )
  // }

}
