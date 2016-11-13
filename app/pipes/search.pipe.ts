import {Pipe} from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe {
    transform(value, term) {
        if (!term) {
            return value;
        }
        return value.filter((item) => item.toString().toLowerCase().indexOf(term) !== -1);
    }
}