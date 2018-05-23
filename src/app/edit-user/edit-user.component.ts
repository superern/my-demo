import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../_models/user";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() editInProgress : boolean;
  @Output() updateContact = new EventEmitter<User>();

  userModel: User = new User();

  constructor() { }

  ngOnInit() {
  }

  onEditContact(){

  }

}
