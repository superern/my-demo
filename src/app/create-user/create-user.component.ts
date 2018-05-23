import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {User} from "../_models/user";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  // close modal with icon
  modalRef : BsModalRef;
  userModel : User = new User();
  @Input() editInProgress: boolean;
  @Output() saveContact = new EventEmitter<User>();
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  onAddContact(){
      this.saveContact.emit(this.userModel);
      this.modalRef.hide();
  }

  openModal(createUserTemplate: TemplateRef<any>){
    this.modalRef = this.modalService.show(createUserTemplate)
  }

}