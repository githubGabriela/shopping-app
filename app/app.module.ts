import {NgModule}      from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component';
import {MenuComponent} from './menu/index';
import {ListComponent} from "./list/list.component";
import {HandleDataService} from "./services/handle-data.service";
import {ListItemComponent} from "./list/list-item/list-item.component";
import {SearchPipe} from "./pipes/search.pipe";
import {ShoppingDialog} from "./list/crud-item/dialog/dialog.component";
import {CrudItemComponent} from "./list/crud-item/crud-item.component";
import {CopyToClipboardDirective} from "./directives/copy-to-clipboard.directive";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ListComponent,
        ListItemComponent,
        CrudItemComponent,
        MenuComponent,
        SearchPipe,
        ShoppingDialog,
        CopyToClipboardDirective
    ],
    entryComponents: [
        ShoppingDialog
    ],

    providers: [
        HandleDataService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}