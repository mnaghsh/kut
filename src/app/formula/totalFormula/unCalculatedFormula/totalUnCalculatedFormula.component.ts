import { ConfigService } from '../../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-totalUnCalculatedFormula',
  templateUrl: './totalUnCalculatedFormula.component.html',
  styleUrls: ['./totalUnCalculatedFormula.component.scss']
})
export class TotalUnCalculatedFormulaComponent implements OnInit {
  displayName: string;
  description: string;
  addFormul: any;
  errorMessage = "";
  constructor(private configService: ConfigService,
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    public commonService: CommonService) {
    this.addFormul = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public addCommonFormul() {
    if (this.addFormul.valid) {
      let body = { DisplayName: this.displayName, Description: this.description }
      this.configService.post("addUnCalculatedTotalFormul", body).subscribe(
        (data) => {
          this.commonService.showEventMessage("فرمول با موفقیت ذخیره شد", 5000)
          this.dialogRef.close();
        },
        (error) => {
          this.commonService.showEventMessage("فرمول با موفقیت ذخیره نشد", 5000)
          this.dialogRef.close();
        }
      )
    }
    else {
      this.errorMessage = "همه موارد ستاره دار باید تکمیل گردد."
    }

  }

}

