import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-commonFormula',
  templateUrl: './commonFormula.component.html',
  styleUrls: ['./commonFormula.component.scss']
})
export class CommonFormulaComponent implements OnInit {
  displayName: string;
  description: string;
  addFormul: any;
  constructor(private configService: ConfigService,
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    public commonService: CommonService) {

      this.addFormul = fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });

    // this.addCommonFormul()
    // this.addCalculatedFormul();
    // this.getColumnDescriptions();
  }

  ngOnInit() {
  }

  public addCommonFormul() {
    if (this.addFormul.valid) {
      debugger
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
  
  }


  private keyDownFunction(event) {
    if (event.keyCode === 13) {
      debugger
     this.addCommonFormul();
      // rest of your code
    }
  }

}
