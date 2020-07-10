import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  displayName:string;
  description:string;
  total=0
  sum=0
  array=[]
  name=""
  constructor(private configService: ConfigService) {
    // this.addCommonFormul()
    // this.addCalculatedFormul();
  //  this.getColumnDescriptions();
  }
  sumFunc(){
    this.total+=this.sum;
let mhd=
{
  name:this.name,
  count:this.sum
}
this.array.push(mhd);

  }

  ngOnInit() {
  }

  // private addCommonFormul() {
  //   let body = { Description: this.displayName, DisplayName: this.description }
  //   this.configService.post("addFormul", body).subscribe(
  //     (data) => {
  //       console.log('data', data)
  //     }
  //   )
  // }

  // private addCalculatedFormul() {
  //   let body = { Description: "سی 1 ضربدر دو", DisplayName: "تعداد واحد نظری ضربدر 2",Formula:"((c1*1.13)+c1)*99" }
  //   this.configService.post("addCalculatedFormul", body).subscribe(
  //     (data) => {
  //       console.log('data', data)
  //     }
  //   )
  // }
  private getColumnDescriptions(){
    this.configService.get("ColumnDescriptions").subscribe(
      (data) => {
        console.log('data', data)
      }
    )
  }

}
