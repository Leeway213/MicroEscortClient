import { Http, Request, RequestMethod, Response } from '@angular/http';
import { Injectable } from '@angular/core';

const BASE_URL = `localhost`;

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) {
  }

  validateUsername(username: string): Promise<Response> {
    const req = new Request({
      url: `http://localhost:3000/users/validate?username=${username}`
    });
    req.method = RequestMethod.Get;
    return this.http.request(req).toPromise();
  }

}
