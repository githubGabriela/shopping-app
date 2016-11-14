import {Component, Input} from '@angular/core';
import {HandleDataService} from "../services/handle-data.service";

@Component({
    selector: 'shopping-list',
    templateUrl: 'app/list/list.component.html'
})
export class ListComponent {
    @Input() searchText: string;

    @Input('category')
    set setItems(category: string) {
        this.setItemsByCategory(category);
    };

    list = {};
    items = [];
    selectedCategory: string;
    modifyItems = false;
    texts = ["azerty", "querty"];

    constructor(private handleDataService: HandleDataService) {

    }

    setItemsByCategory(category) {
        if (category) {
            this.modifyItems = false;
            this.selectedCategory = category;
            switch (this.selectedCategory) {
                case('My List'):
                    this.list = this.handleDataService.getItems('My List');
                    break;
                case('All products'):
                    this.list = this.handleDataService.getItems('All products');
                    break;
                default:
                    this.items = this.handleDataService.getItemsForCategory(category);
                    break;
            }
        }
    }

    listKeys() {
        return Object.keys(this.list);
    }

    addItem(item: string) {
        if (item) {
            this.handleDataService.addItem('My List', this.selectedCategory, item);
        }
    }

    addItemMyList(item: string, category: string) {
        if (item) {
            this.handleDataService.addItem('All products', category, item);
        }
    }

    emptyMyList(): void {
        this.handleDataService.emptyMyList();
    }

    removeItem(item: any) {
        if (item) {
            this.handleDataService.removeItem('My List', this.selectedCategory, item);
        }
    }

    editItemAllProducts(payload: string, category: string): void {
        if (payload && category) {
            this.handleDataService.editItemAllProducts(category, payload);
        }
    }

    deleteItemAllProducts(item: string, category: string): void {
        if (item && category) {
            this.handleDataService.deleteItemAllProducts(category, item);
        }
    }

    myListContainsItem(item: string) {
        return this.handleDataService.myListContainsItem(item);
    }

    toggleModifyItems(): void {
        this.modifyItems = !this.modifyItems;
    }

    addItemToAllProducts(newItem: any) {
        if (newItem.category && newItem.name) {
            this.handleDataService.addItemToAllProducts(newItem.category, newItem.name);
        }
    }



}
