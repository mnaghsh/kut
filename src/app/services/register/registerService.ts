import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public configService:ConfigService) { }

public getUsers():Observable<any>{
  return this.configService.get('register');
}
public updateUsers(id):Observable<any>{
  
  return this.configService.get('register/'+id);
}
public insertUsers(body):Observable<any>{
  return this.configService.post('register',body);
}

  
}
