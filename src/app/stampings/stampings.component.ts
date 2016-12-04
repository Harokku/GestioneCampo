import {Component, OnInit, EventEmitter} from '@angular/core';

import {UserService} from "../user.service";
import {User} from "../user";
import {Observable, Subject} from "rxjs";
import {MaterializeAction, } from "angular2-materialize";
import {StampService} from "../stamp.service";
import {Stamp} from "../stamp";

@Component({
  selector: 'app-stampings',
  templateUrl: './stampings.component.html',
  styleUrls: ['./stampings.component.css'],
  providers: [
    UserService,
    StampService
  ]
})

export class StampingsComponent implements OnInit {
  badgedUsers: User;
  stampType: string;
  stamps: Stamp[];
  stamp: Stamp;

  // Materialize event emitters
  modalLectorAction = new EventEmitter<string|MaterializeAction>();
  toastAction = new EventEmitter<string|MaterializeAction>();

  constructor(
    private userService: UserService,
    private stampService: StampService
  ) { }

   // Push search term into the observable stream.
  search(term: string): void {
    this.userService.getBadgeUser(term)
      .then(user => this.badgedUsers = user);
    console.log(JSON.stringify(this.badgedUsers))
  }

  // Function for modal opening and closing
  /**
   * Open modal with barcode scanner
   * @param stampType: stamp type to be written (Enter,exit,break..)
   */
  openLector(stampType: string): void {
    this.stampType = stampType;
    this.modalLectorAction.emit({action:"modal", params:['open']});
  }

  /**
   * Close modal and, if not null, post stamp to the DB
   * @param action: Action selection (post or not)
   */
  closeLector(action: string): void{
    if (action == 'Timbra') {
      this.modalLectorAction.emit({action: "modal", params: ['close']});
      if (this.badgedUsers) {
        this.toastAction.emit({
          action: "toast",
          params: [this.badgedUsers.surname + " " + this.badgedUsers.name + " ha timbrato l'" + this.stampType, 5000, 'rounded']
        });
        this.doAddStamp(this.badgedUsers, this.stampType);
        console.log("Ha timbrato l'" + this.stampType + ":" + JSON.stringify(this.badgedUsers));
      }
      this.badgedUsers = null;
    } else {
      this.modalLectorAction.emit({action: "modal", params: ['close']});
      this.badgedUsers = null;
    }
  }

  ngOnInit() {

  }

  /**
   * Create new stamp and post to DB via service
   * @param user: User to be saved in stamp
   * @param stampType: Stamp type (Enter, exit, break..)
   */
  doAddStamp(user: User, stampType: string): void{
    this.stamp = new Stamp;
    this.stamp.type = stampType;
    this.stamp.surname = user.surname;
    this.stamp.name = user.name;
    this.stamp.role = user.role;
    this.stamp.badge_number = user.badge_number;
    this.stamp.userRef = user.id;
    if (!this.stamp) { return; }
    this.stampService.createStamp(this.stamp)
      .then(res => {
        this.stamp = null
      });
  }

  /**
   * Debug function to check if stamp have been written in the DB
   */
  doShowStamps(): void {
    this.stampService.getStamps()
      .then(stamps => {
        this.stamps = stamps;
        console.log(JSON.stringify(this.stamps));
      });

  }

}
