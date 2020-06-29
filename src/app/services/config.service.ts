import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseUrl = 'http://localhost:50030/api/'


  constructor(public http: HttpClient) {
  }

  public get(url: string, options?: any) {
    return this.http.get<any[]>(this.baseUrl + url, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete<any[]>(this.baseUrl + url, options);
  }

  public post(url: string, body, options?: any) {
    return this.http.post(this.baseUrl + url, body, options);
  }

  public put(url: string, body, options?: any) {
    return this.http.put(this.baseUrl + url, body, options);
  }

}
