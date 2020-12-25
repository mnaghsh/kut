import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractSignituresForCalculationUnitsService {

  constructor(public configService:ConfigService) { }

public getContractSignituresForCalculationUnits(inputTermId):Observable<any>{
  //debugger
  return this.configService.get('contractSignituresForCalculationUnits/16');
}

public postContractSignituresForCalculationUnits(body):Observable<any>{
  return this.configService.post('contractSignituresForCalculationUnits',body);
}




  
}
