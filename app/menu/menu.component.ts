import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {HandleDataService} from '../services/index';

@Component({
    selector: 'shopping-menu',
    templateUrl: 'app/menu/menu.component.html'
})
export class MenuComponent implements OnInit {
    @Output() categoryChanged:EventEmitter<any> = new EventEmitter();
    @Output() clearSearchInput:EventEmitter<any> = new EventEmitter();

    menuItems = [];

    constructor(private handleDataService:HandleDataService) {
        this.menuItems = this.handleDataService.getCategories();

    }

    ngOnInit() {
        this.emitInitCategory(this.menuItems[0]);
    }

    categorySelected(category:string):void {
        if (category) {
            this.categoryChanged.emit(category);
            this.clearSearchInput.emit(category);
        }
    }

    private emitInitCategory(category) {
        this.categoryChanged.emit("My List");
    }

}
