import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class totalMainGridReportReadOnlyService {

  constructor(public configService:ConfigService) { }

public getColumnsOfTotalReport():Observable<any>{
  return this.configService.get('totalReportReadOnly');
}

public getTotalDataOfReport(body):Observable<any>{
  return this.configService.post('getTotalReportReadOnly',body);
}

public saveDataOfTotalReport(body):Observable<any>{
  return this.configService.post('TotalReport',body);
}
public getCourseList():Observable<any>{
  return this.configService.get('course');
}
public getTermList():Observable<any>{
  return this.configService.get('term');
}


  
}
