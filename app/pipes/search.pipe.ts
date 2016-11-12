import {Pipe} from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe {
    transform(value, term) {
        if (!term) {
            return value;
        }
        console.log('term ', term);
        // return value.filter((item) => item.toString().toLowerCase().indexOf(term) !== -1);
        return value.filter(function (item) {
            console.log(item);
            return item.toString().toLowerCase().indexOf(term) !== -1;
    });
}
}