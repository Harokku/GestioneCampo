import {Injectable} from "@angular/core";
import {Headers ,Http} from "@angular/http";

import 'rxjs/add/operator/toPromise'

import {Stamp} from "./stamp";

@Injectable()
export class StampService{
  private headers = new Headers({'Content-Type': 'application/json'});
  private stampsUrl = 'app/stamps'

  constructor(private http: Http) { }

  getStamps(): Promise<Stamp[]>{
    return this.http
      .get(this.stampsUrl)
      .toPromise()
      .then(response => response.json().data as Stamp[])
  }

  createStamp(stamp: Stamp): Promise<Stamp>
  {
    return this.http
      .post(this.stampsUrl, JSON.stringify(stamp), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
  }
}
