import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {HandleDataService} from '../services/index';

@Component({
    selector: 'shopping-menu',
    templateUrl: 'app/menu/menu.component.html',
    styleUrls: ['../app/menu/menu.component.scss']
})
export class MenuComponent {
    @Output() categoryChanged: EventEmitter<any> = new EventEmitter();
    @Output() clearSearchInput: EventEmitter<any> = new EventEmitter();

    @Input('myList')
    set setCategory(value: string) {
        if (value) {
            this.updateSelectedCategory('My List');
            this.clearSearch();
        }
    }

    menuItems = [];
    selectedCategory = 'My List'; //initial value

    constructor(private handleDataService: HandleDataService) {
        this.menuItems = this.handleDataService.getCategories();

    }

    categorySelected(category: string): void {
        if (category) {
            this.updateSelectedCategory(category);
            this.categoryChanged.emit(category);
            this.clearSearch();
        }
    }

    private updateSelectedCategory(category: string) {
        this.selectedCategory = category;
    }

    private clearSearch() {
        this.clearSearchInput.emit(true);
    }
}
