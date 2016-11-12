import{Component, Input, Output, EventEmitter} from '@angular/core';
import {HandleDataService} from "../services/handle-data.service";

@Component({
    selector: 'shopping-header',
    templateUrl: 'app/header/header.component.html',
    styleUrls: ['../app/header/header.component.scss']
})
export class HeaderComponent {
    @Output() searchChanged: EventEmitter<any> = new EventEmitter();
    @Input() search: string;

    constructor(private handleDataService: HandleDataService) {

    }


    getTotal() {
        return this.handleDataService.getTotalItems();
    }

    searchValueChanged() {
        this.searchChanged.emit(this.search);
    }
}
