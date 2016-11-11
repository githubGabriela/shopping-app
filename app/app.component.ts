import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    category:string;

    constructor() {

    }

    categoryHasChanged(category: any):void {
        console.log('category');
        if (category) {
            this.category = category;
        }
    }
}