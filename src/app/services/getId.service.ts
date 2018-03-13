import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class GetIdService {

  constructor(private http: HttpClient) {}
  //当前页面下的任务集Id
  currentTasksetId:string;

}


