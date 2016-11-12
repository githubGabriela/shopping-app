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
        MenuComponent,
        SearchPipe
    ],

    providers: [
        HandleDataService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}