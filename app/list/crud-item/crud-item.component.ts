import {Component, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import {ShoppingDialog} from './dialog/dialog.component';

@Component({
    selector: 'shopping-crud-item',
    templateUrl: 'app/list/crud-item/crud-item.component.html'
})

export class CrudItemComponent {
    @Output() newItemCreated: EventEmitter<any> = new EventEmitter();

    dialogRef: MdDialogRef <ShoppingDialog>;


    constructor(public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {
    }

    openDialog() {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

        this.dialogRef = this.dialog.open(ShoppingDialog, config);

        this.dialogRef.afterClosed().subscribe(result => {
            if (result !== 'cancel') {
                this.newItemCreated.emit(result);
            }
            this.dialogRef = null;
        });
    }
}




