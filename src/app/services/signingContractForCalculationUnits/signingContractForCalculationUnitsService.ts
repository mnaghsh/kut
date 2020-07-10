import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigningContractForCalculationUnitsService {

  constructor(public configService:ConfigService) { }

public getSigningContractForCalculationUnits():Observable<any>{
  return this.configService.get('signingContractForCalculationUnits');
}

public postSigningContractForCalculationUnits(body):Observable<any>{
  return this.configService.post('signingContractForCalculationUnits',body);
}




  
}
