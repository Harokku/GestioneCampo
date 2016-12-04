import {Component, OnInit, EventEmitter} from '@angular/core';

import {UserService} from "../user.service";
import {User} from "../user";
import {Observable, Subject} from "rxjs";
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'app-stampings',
  templateUrl: './stampings.component.html',
  styleUrls: ['./stampings.component.css'],
  providers: [UserService]
})

export class StampingsComponent implements OnInit {
  users: User[];
  badgedUsers: Observable<User[]>;
  private searchTerms = new Subject<string>();
  selectedUser: User;
  modalLectorAction = new EventEmitter<string|MaterializeAction>();

  constructor(
    private userService: UserService
  ) { }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => this.users = users);
  }

  // Push search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  onReadBadge(): void{
    console.log(this.users);
    console.log(this.selectedUser);
  }

  // Function for modal opening and closing
  openLector() {
    this.modalLectorAction.emit({action:"modal", params:['open']});
  }
  closeLector(action: string){
    if (action == action) {
      this.modalLectorAction.emit({action: "modal", params: ['close']});
      console.log("Ha timbrato:" + action)
      console.log("Ha timbrato:" + this.badgedUsers.valueOf())
    } else {
      this.modalLectorAction.emit({action: "modal", params: ['close']});
    }
  }

  ngOnInit() {
    this.getUsers();
    this.badgedUsers = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.userService.getBadgeUser(term)
        : Observable.of<User[]>([])
      )
      .catch(error => {
        console.log(error);
        return Observable.of<User[]>([]);
      });
  }

}
