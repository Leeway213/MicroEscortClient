import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpEventType } from '@angular/common/http';

@Injectable()
export class HttpErrorService {

  constructor() { }

}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
      return next.handle(req).do(event => {
        if (event.type === HttpEventType.ResponseHeader) {
          if (!event.ok) {
            console.log('******************');
            console.log(event);
            console.log('******************');
          }
        }
      });
  }

}
