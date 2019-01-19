import { NgModule } from "@angular/core";
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";
import { SearchFilterPipe } from "./pipes/search-filter.pipe";

@NgModule({
    declarations: [
        SafeHtmlPipe,
        SearchFilterPipe
    ],
    exports: [
        SafeHtmlPipe,
        SearchFilterPipe
    ]
})
export class SharedModule { }