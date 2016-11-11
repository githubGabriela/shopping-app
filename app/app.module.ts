import {NgModule}      from '@angular/core';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component';
import {MenuComponent} from './menu/index';
import {ListComponent} from "./list/list.component";
import {HandleDataService} from "./services/handle-data.service";
import {ListItemComponent} from "./list/list-item/list-item.component";


@NgModule({
    imports: [
        BrowserModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ListComponent,
        ListItemComponent,
        MenuComponent
    ],
    providers: [
        HandleDataService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}