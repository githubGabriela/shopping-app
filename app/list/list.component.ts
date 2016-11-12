import {Component, Input} from '@angular/core';
import {HandleDataService} from "../services/handle-data.service";

@Component({
    selector: 'shopping-list',
    templateUrl: 'app/list/list.component.html'
})
export class ListComponent {
    @Input() searchText : string;
    @Input('category')
    set setItems(category: string) {
        this.setItemsByCategory(category);
    };

    list = {};
    listItems = [];
    listCategory: string;

    constructor(private handleDataService: HandleDataService) {

    }

    setItemsByCategory(category) {
        if (category) {
            this.listCategory = category;
            switch (this.listCategory) {
                case('My List'):
                    this.list = this.handleDataService.getItems('My List');
                    break;
                case('All products'):
                    this.list = this.handleDataService.getItems('All products');
                    break;
                default:
                    this.listItems = this.handleDataService.getItemsForCategory(category);
                    break;
            }
        }
    }

    listKeys() {
        return Object.keys(this.list);
    }

    addItem(item: string) {
        if (item) {
            this.handleDataService.addItem('My List', this.listCategory, item);
        }
    }

    addItemMyList(item: string, category: string){
        if (item) {
            this.handleDataService.addItem('All products', category, item);
        }
    }

    removeItem(item: any) {
        if (item) {
            this.handleDataService.removeItem('My List', this.listCategory, item);
        }
    }

    myListContainsItem(item: string) {
        return this.handleDataService.myListContainsItem(item);
    }

}
