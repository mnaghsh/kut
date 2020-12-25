import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class ContractSignituresService {

  constructor(public configService:ConfigService,
    public commonService:CommonService
    ) { }

public getContractSignitures(inputTermId):Observable<any>{
  //debugger
  return this.configService.get('contractSignitures/'+this.commonService.termId);
}

public postContractSignitures(body):Observable<any>{
  return this.configService.post('contractSignitures',body);
}




  
}
