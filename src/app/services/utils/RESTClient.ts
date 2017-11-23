import { HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';

export class RESTClient extends HttpClient {

    headers: HttpHeaders;

    baseUrl: string;

    constructor(handler: HttpHandler, baseurl?: string, headers?: HttpHeaders) {
        super(handler);

        this.baseUrl = baseurl;
        this.headers = headers;
    }

}
