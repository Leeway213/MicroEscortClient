import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHeaderResponse,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpProgressService {

  progress = 0;

  loading = false;

  constructor() { }

}


@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

    constructor(
        private httpProgressService: HttpProgressService
    ) {}

    // tslint:disable-next-line:max-line-length
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        const started: number = Date.now();

        this.httpProgressService.progress = 0;
        this.httpProgressService.loading = true;

        return next.handle(req).do(event => {
            if (event.type === HttpEventType.DownloadProgress) {
                this.httpProgressService.progress = event.loaded / event.total;
            }

            if (event instanceof HttpResponse) {
                const elapsed = Date.now() - started;
                console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                // this.httpProgressService.loading = false;
            }
        });
    }
}