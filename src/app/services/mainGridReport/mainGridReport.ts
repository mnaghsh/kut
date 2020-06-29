import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainGridReportService {

  constructor(public configService:ConfigService) { }

public getColumnsOfReport():Observable<any>{
  return this.configService.get('report');
}

public getDataOfReport(body):Observable<any>{
  return this.configService.post('getReport',body);
}

public saveDataOfReport(body):Observable<any>{
  return this.configService.post('report',body);
}
public getCourseList():Observable<any>{
  return this.configService.get('course');
}
public getTermList():Observable<any>{
  return this.configService.get('term');
}


  
}
