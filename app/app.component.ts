import {Component} from '@angular/core';
import {HandleDataService} from "./services/handle-data.service";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['../app/app.component.scss']
})
export class AppComponent {
    category = 'My List';
    searchText: string;
    myList = false;

    constructor(private handleDataService: HandleDataService) {

    }

    categoryUpdate(category: any): void {
        if (category) {
            this.category = category;
            this.myList = false;
        }
    }

    redirectMyList(): void {
        this.category = "My List";
        this.myList = true;
    }

    updateSearch(value: string) {
        this.searchText = value;
    }

    clearInput(value: boolean) {
        if (value) {
            this.searchText = '';
        }
    }

    getTotal() {
        return this.handleDataService.getTotalItems();
    }

}