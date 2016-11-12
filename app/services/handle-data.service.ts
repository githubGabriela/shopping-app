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


    getCategories(): Array<string> {
        let categories = [this.names.myList];
        categories.push(...Object.keys(this.list[this.names.allProducts]));
        categories.push(this.names.allProducts);
        return categories;
    }

    getItems(key: string) {
        return this.list[key] ? this.list[key] : {};
    }

    getItemsForCategory(category: string): Array<string> {
        let listCategory = this.list[this.names.allProducts][category];
        return listCategory ? listCategory : [];
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