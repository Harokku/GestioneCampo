import {Component, OnInit, EventEmitter} from '@angular/core';

import {UserService} from "../user.service";
import {User} from "../user";
import {Observable, Subject} from "rxjs";
import {MaterializeAction, } from "angular2-materialize";

@Component({
  selector: 'app-stampings',
  templateUrl: './stampings.component.html',
  styleUrls: ['./stampings.component.css'],
  providers: [UserService]
})

export class StampingsComponent implements OnInit {
  badgedUsers: User;
  stampType: string;
  modalLectorAction = new EventEmitter<string|MaterializeAction>();
  toastAction = new EventEmitter<string|MaterializeAction>();

  constructor(
    private userService: UserService
  ) { }

   // Push search term into the observable stream.
  search(term: string): void {
    this.userService.getBadgeUser(term)
      .then(user => this.badgedUsers = user);
    console.log(JSON.stringify(this.badgedUsers))
  }

  // Function for modal opening and closing
  openLector(stampType: string): void {
    this.stampType = stampType;
    this.modalLectorAction.emit({action:"modal", params:['open']});
  }
  closeLector(action: string): void{
    if (action == 'Timbra') {
      this.modalLectorAction.emit({action: "modal", params: ['close']});
      this.toastAction.emit({action: "toast", params: [this.badgedUsers[0].surname + " " + this.badgedUsers[0].name + " ha timbrato l'" + this.stampType, 5000, 'rounded']});
      console.log("Ha timbrato l'" + this.stampType + ":" + JSON.stringify(this.badgedUsers[0]));
      this.badgedUsers = null;
    } else {
      this.modalLectorAction.emit({action: "modal", params: ['close']});
      this.badgedUsers = null;
    }
  }

  ngOnInit() {

  }

}
