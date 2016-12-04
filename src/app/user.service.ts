import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";

import 'rxjs/add/operator/toPromise'

import {User} from "./user";

@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }


  getBadgeUser(term: string): Promise<User> {
    return this.http
      .get(`app/users/?badge_number=${term}`)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

}
