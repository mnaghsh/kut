import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  reportUserId:any;
  termId;
  showTotalValueTable=true;
  constructor(  private snackBar: MatSnackBar,) { }
  showEventMessage(message,duration=3000,type?) {
    this.snackBar.open(message, '', {
      direction: 'rtl',
      duration: duration,
      panelClass: type? type: ''
    });
  }
}
