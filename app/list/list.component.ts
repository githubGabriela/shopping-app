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

    copyListToClipboard(): void {
        var textArea = document.createElement("textarea");

        //
        // *** This styling is an extra step which is likely not required. ***
        //
        // Why is it here? To ensure:
        // 1. the element is able to have focus and selection.
        // 2. if element was to flash render it has minimal visual impact.
        // 3. less flakyness with selection and copying which **might** occur if
        //    the textarea element is not visible.
        //
        // The likelihood is the element won't even render, not even a flash,
        // so some of these are just precautions. However in IE the element
        // is visible whilst the popup box asking the user for permission for
        // the web page to copy to the clipboard.
        //

        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';

        textArea.value = this.getFormatedList();
        document.body.appendChild(textArea);
        textArea.select();

        try {
            var successful = document.execCommand('copy');
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    }

    private getFormatedList(): string {
        //My list
        let formatedList = '';
        let list = this.list;
        let categories = Object.keys(list);
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].length > 0) {
                let items = list[categories[i]];
                if (items.length > 0) {
                    formatedList += categories[i] + ': ';
                }
                for (let j = 0; j < items.length; j++) {
                    formatedList += items[j];
                    if (j < items.length - 1) {
                        formatedList += ', ';
                    }
                }
                formatedList += '\n';
            }
        }
        return formatedList;
    }
}
