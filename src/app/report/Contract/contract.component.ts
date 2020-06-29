import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  displayName: string;
  description: string;
  mhd;
  constructor(private configService: ConfigService) {
    this.mhd = "mhd2"
    // this.addCommonFormul()
    // this.addCalculatedFormul();
    //  this.getColumnDescriptions();
  }

  ngOnInit() {
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
           *{
              direction:rtl;
              font-family: 'iranSans';
              text-align: right;

            }
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
