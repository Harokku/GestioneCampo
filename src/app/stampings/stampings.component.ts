import { Component, OnInit } from '@angular/core';

import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-stampings',
  templateUrl: './stampings.component.html',
  styleUrls: ['./stampings.component.css'],
  providers: [UserService]
})
export class StampingsComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(
    private userService: UserService
  ) { }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => this.users = users);
  }

  onReadBadge(): void{
    console.log(this.users);
    console.log(this.selectedUser);
  }

  ngOnInit() {
    this.getUsers();
  }

}
