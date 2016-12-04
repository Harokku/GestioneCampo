import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";

import 'rxjs/add/operator/toPromise'

import {User} from "./user";
import {Observable} from "rxjs";

@Injectable()
export class UserService {
  private usersUrl = 'app/users';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  getBadgeUser(term: string): Observable<User[]> {
    return this.http
      .get(`app/users/?badge_number=${term}`)
      .map((r: Response) => r.json().data as User[]);
  }

}
