import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractSignituresService {

  constructor(public configService:ConfigService) { }

public getContractSignitures(inputTermId):Observable<any>{
  debugger
  return this.configService.get('contractSignitures/16');
}

public postContractSignitures(body):Observable<any>{
  return this.configService.post('contractSignitures',body);
}




  
}
