import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list';

import { UsersService } from '../users.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  selectedlist: User[] = [];
  userName: string;
  name: string;
  role: string;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersList = this.usersService.getUsersList();
  }

  search(strSearch: string) {
    this.usersList = this.usersService.findUser(strSearch);
  }

  sort(type: string) {
    this.usersList = this.usersService.sortUsers(type);
  }

  addUser() {
    this.usersService.addUser({
      id: Math.floor(Math.random() * 6 + 10),
      name: this.name,
      username: this.userName,
      email: '',
      role: this.role,
      phone: '',
      website: '',
    });
  }

  deleteUsers() {
    this.usersService.deleteUsers(this.selectedlist);

    this.usersList = this.usersService.getUsersList();
  }

  selectItem(users: MatListOption[]) {
    this.selectedlist = [];
    users.forEach((element) => {
      this.selectedlist.push(element.value);
    });
  }
}
