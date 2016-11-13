import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {HandleDataService} from "../../../services/handle-data.service";

@Component({
    selector: 'shopping-dialog',
    templateUrl: 'app/list/crud-item/dialog/dialog.component.html'
})

export class ShoppingDialog {
    categories: Array<string>;
    category: string;
    name: string;

    constructor(public dialogRef: MdDialogRef<ShoppingDialog>,
                private handleDataService: HandleDataService) {
        this.categories = this.handleDataService.getCategories();
    }

    create() {
        this.dialogRef.close({'category': this.category, 'name': this.name});
    }

    cancel() {
        this.dialogRef.close('cancel');
    }
}