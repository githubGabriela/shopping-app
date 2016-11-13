import {Injectable} from '@angular/core';

@Injectable()
export class HandleDataService {

    private list = {
        "My List": {
            "Legumes": [
                "Oignons"
            ],
            "Fruits": [
                "Oranges"
            ]
        },

        "All products": {
            "Legumes": [
                "Poireaux",
                "Poivre",
                "Oignons",
                "Salade"
            ],
            "Fruits": [
                "Oranges",
                "Pommes",
                "Poires"
            ]
        }
    };
    private totalMyList = 0;

    private names = {
        myList: 'My List',
        allProducts: 'All products'
    };

    constructor() {
        this.setInitialTotalItems();
    }

    private loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', '../app/data/data.json', false); //false for synchronous
        xobj.onreadystatechange = function () {
            // if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
            // }
        };
        xobj.send(null);
    }


    getMenuItems(): Array<string> {
        let items = [this.names.myList];
        items.push(...Object.keys(this.list[this.names.allProducts]));
        items.push(this.names.allProducts);
        return items;
    }

    getCategories(): Array<string> {
        return Object.keys(this.list[this.names.allProducts]);
    }

    getItems(key: string) {
        return this.list[key] ? this.list[key] : {};
    }

    getItemsForCategory(category: string): Array<string> {
        let list = this.list[this.names.allProducts][category];
        return list ? list : [];
    }


    myListContainsItem(item: string) {
        let listType = this.names.myList;
        let list = this.list[listType];
        let categories = Object.keys(list);

        for (let i = 0; i < categories.length; i++) {
            let items = list[categories[i]];
            for (let j = 0; j < items.length; j++) {
                if (items[j] === item) {
                    return true;
                }
            }
        }
        return false;
    }

    addItem(listType: string, category: string, item: string) {
        if (listType === this.names.allProducts) {
            this.addToMyList(category, item);
        } else if (this.itemExists(this.list[listType][category], item) == -1) {
            this.list[listType][category].push(item);
            this.incrementTotalItems();
        }
    }

    clearMyList(): void {
        let listType = this.names.myList;
        let list = this.list[this.names.myList];
        let categories = Object.keys(list);
        for (let i = 0; i < categories.length; i++) {
            list[categories[i]] = [];
        }
    }

    removeItem(listType: string, category: string, item: string) {
        if (listType === this.names.myList || listType === this.names.allProducts) {
            this.removeFromMyList(item);
        }
        else {
            let index = this.itemExists(this.list[listType][category], item);
            if (index != -1) {
                this.list[listType][category].splice(index, 1);
                this.decrementTotalItems();
            }
        }
    }

    addItemToAllProducts(category: string, name: string) {
        let items = this.list[this.names.allProducts][category];
        if (this.itemExists(items, name) === -1) {
            items.push(name);
        }
    }

    editItemAllProducts(category: string, payload: any) {
        //edit from all Products
        let items = this.list[this.names.allProducts][category];
        let index = this.itemExists(items, payload.item);

        if (index !== -1) {
            items[index] = payload.newItem;
        }

        //edit from My List
        let items = this.list[this.names.myList][category];
        let index = this.itemExists(items, payload.item);

        if (index !== -1) {
            items[index] = payload.newItem;
        }
    }

    deleteItemAllProducts(category: string, name: string) {
        //delete from all Products
        let items = this.list[this.names.allProducts][category];
        let index = this.itemExists(items, name);

        if (index !== -1) {
            items.splice(index, 1);
        }

        //delete from myList
        items = this.list[this.names.myList][category];
        index = this.itemExists(items, name);
        if (index !== -1) {
            items.splice(index, 1);
        }

    }

    getTotalItems(): number {
        return this.totalMyList;
    }

    private setInitialTotalItems() {
        let list = this.list[this.names.myList];
        let categories = Object.keys(list);

        for (let i = 0; i < categories.length; i++) {
            this.totalMyList += list[categories[i]].length;
        }
    }

    private incrementTotalItems() {
        this.totalMyList = ++this.totalMyList;
    }

    private decrementTotalItems() {
        this.totalMyList = --this.totalMyList;
    }

    private addToMyList(category: string, item: string) {
        let listType = this.names.myList;
        let list = this.list[listType];
        let categories = Object.keys(list);

        for (let i = 0; i < categories.length; i++) {
            if (categories[i] === category) {
                let items = list[categories[i]];
                if (this.itemExists(items, item) === -1) {
                    list[category].push(item);
                    this.incrementTotalItems();
                }
            }
        }
    }

    private removeFromMyList(item: string) {
        let listType = this.names.myList;
        let list = this.list[listType];
        let categories = Object.keys(list);

        for (let i = 0; i < categories.length; i++) {
            let items = list[categories[i]];
            for (let j = 0; j < items.length; j++) {
                if (items[j] === item) {
                    list[categories[i]].splice(j, 1);
                    this.decrementTotalItems();
                }
            }
        }
    }

    private itemExists(array, item) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) {
                return i;
            }
        }
        return -1;
    }

}