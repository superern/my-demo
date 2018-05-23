import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions} from 'ag-grid';
import {User} from '../_models/user';
import {UserService} from '../_service/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent {
    private gridOptions: GridOptions;

    // row data and column definitions
    columnDefs: ColDef[];
    public rowData: User[];

    // gridApi and columnAPI
    private gridApi: GridApi;
    private columnApi: ColumnApi;

    editInProgress = false;

    private userBeingEdited: User = null;
    private containerCoords: {} = null;
    rowSelection;
    private disable = false;
    contactToAdd;
    @ViewChild('grid', {read: ElementRef}) public grid;

    // constructor
    // Inject user service
    constructor( private userService: UserService, private toastr: ToastrService) {

        this.columnDefs = this.createColumnDef();
        this.rowSelection = 'multiple';
        this.userService.findAll().subscribe(
            user => this.rowData = user,
            error => this.toastr.error('Unable to load', 'Error')
        );
    }

    getRowNodeId(data) { return data.id; }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    protected createColumnDef() {
        return [
            { headerName : 'First Name',    field : 'firstname', editable: true  },
            { headerName : 'Last Name',     field : 'lastname',  editable: true  },
            { headerName : 'Mobile',        field : 'mobile',    editable: true  },
            { headerName : 'Post Code',     field : 'postcode',  editable: true  },
            { headerName : 'Email',         field : 'email',     editable: true  }
        ];
    }

    onRowDoubledClicked(params: any) {
        if (this.editInProgress) {
            return;
        }


        this.userBeingEdited = <User> params.data;
        this.editInProgress = true;
    }

    // update database on cell-value changed
    onCellValueChanged(userToSave: any) {

        if (userToSave.oldValue !== userToSave.newValue) {
            this.userService.update(userToSave.data).subscribe(
                savedUser => this.toastr.success('Successfully updated to ' + userToSave.newValue , 'Success!'),
                error => this.toastr.error('Update contact failed', 'Error')
            );
        }

        this.userBeingEdited = null;
        this.editInProgress = false;
    }

    updateContact(user: User) {

    }
    // Add contact
    saveContact(user: User) {
        this.userService.add(user).subscribe(
            savedUser => {
                this.gridApi.updateRowData({
                    add: [savedUser],
                    addIndex: 0
                });
                this.toastr.success('Successfully added user', 'Success!');
            },
            error => this.toastr.error('Adding contact Failed', 'Error')
        );
    }

    rowsSelected() {
        return this.gridApi && this.gridApi.getSelectedRows().length > 0;
    }

    // Remove contacts
    onRemoveSelected() {
        const selectedData = this.gridApi.getSelectedRows();

        this.userService.delete(selectedData).subscribe(
            deletedUser => {

                // only redraw removed rows
                this.gridApi.updateRowData({remove: selectedData});
                this.toastr.success(deletedUser.status, 'Success');

            },
            error => {this.toastr.error('Something went wrong', 'Error'); }
        );
    }


}
