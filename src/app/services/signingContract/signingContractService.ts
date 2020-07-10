import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigningContractService {

  constructor(public configService:ConfigService) { }

public getSigningContract():Observable<any>{
  return this.configService.get('signingContract');
}

public postSigningContract(body):Observable<any>{
  return this.configService.post('signingContract',body);
}




  
}
