import { Injectable, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  @Output() saveTotalMainGrid = new EventEmitter();

 // public saveTotalMainGrid: Subject<any> = new Subject<any>();
  public showSaveBtn: boolean;
  public rollback: Subject<any> = new Subject<any>();
  loading:boolean;
  coursesList;
  teacherList;
  reportUserId:any;
  termId;
  showTotalValueTable=true;
  activeUser: any;
  constructor(  private snackBar: MatSnackBar,) { }
  showEventMessage(message,duration=3000,type?) {
    this.snackBar.open(message, '', {
      direction: 'rtl',
      duration: duration,
      panelClass: type? type: 'background-color:red'
    });
  }


}
