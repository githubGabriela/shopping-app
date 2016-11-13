import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'shopping-list-item',
    templateUrl: 'app/list/list-item/list-item.component.html',
    styleUrls: ['app/list/list-item/list-item.component.scss']
})
export class ListItemComponent {
    @Input() item: string;
    @Input() removeIcon: boolean;
    @Input() modifyItems: boolean;

    @Output() add: EventEmitter<any> = new EventEmitter();
    @Output() remove: EventEmitter<any> = new EventEmitter();
    @Output() deleteItemFromAllProducts: EventEmitter<any> = new EventEmitter();
    @Output() editItemForAllProducts: EventEmitter<any> = new EventEmitter();

    edit = false;
    newItem: string;

    constructor() {
    }

    removeItem(): void {
        this.remove.emit(this.item);
    }

    addItem(): void {
        this.add.emit(this.item);
    }

    toggleEdit(): void {
        this.edit = !this.edit;
    }

    editItem(): void {
        this.editItemForAllProducts.emit({item: this.item, newItem: this.newItem});
        this.item = this.newItem;
        this.edit = false;
        this.newItem = '';
    }

    cancelEdit(): void {
        this.newItem = '';
        this.edit = false;
    }

    deleteItem(): void {
        this.deleteItemFromAllProducts.emit(this.item);
    }
}
