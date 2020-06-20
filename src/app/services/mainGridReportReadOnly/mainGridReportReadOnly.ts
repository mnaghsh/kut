import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainGridReportReadOnlyService {

  constructor(public configService:ConfigService) { }

public getColumnsOfReportReadOnly():Observable<any>{
  return this.configService.get('reportReadOnly');
}

public getDataOfReportReadOnly():Observable<any>{
  return this.configService.get('reportReadOnly/1');
}


  
}
