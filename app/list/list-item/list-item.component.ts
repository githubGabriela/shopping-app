import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'shopping-list-item',
    templateUrl: 'app/list/list-item/list-item.component.html',
    styleUrls: ['app/list/list-item/list-item.component.scss']
})
export class ListItemComponent {
    @Input() item: string;
    @Input() removeIcon: boolean;
    @Output() add: EventEmitter<any> = new EventEmitter();
    @Output() remove: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    removeItem() {
        this.remove.emit(this.item);
    }

    addItem() {
        this.add.emit(this.item);
    }

}
