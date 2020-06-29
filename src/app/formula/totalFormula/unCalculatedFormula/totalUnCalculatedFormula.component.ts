import { ConfigService } from '../../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-totalUnCalculatedFormula',
  templateUrl: './totalUnCalculatedFormula.component.html',
  styleUrls: ['./totalUnCalculatedFormula.component.scss']
})
export class TotalUnCalculatedFormulaComponent implements OnInit {
  displayName: string;
  description: string;
  constructor(private configService: ConfigService,
    public dialogRef: MatDialogRef<any>,
    private commonService: CommonService) {
    // this.addCommonFormul()
    // this.addCalculatedFormul();
    // this.getColumnDescriptions();
  }

  ngOnInit() {
  }

  private addCommonFormul() {
    let body = {DisplayName : this.displayName, Description: this.description }
    this.configService.post("addUnCalculatedTotalFormul", body).subscribe(
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

}

