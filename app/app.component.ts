import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    category: string;
    searchText: string;

    constructor() {

    }

    categoryHasChanged(category: any): void {
        if (category) {
            this.category = category;
        }
    }

    searchValueChanged(search: string) {
        this.searchText = search;
    }

    clearSearch() {
        this.searchText = '';
    }
}