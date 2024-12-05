import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CalComponent } from './feature/catVac/catVac.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BomComponent } from './feature/bom/bom.component';
import { AgGridModule } from 'ag-grid-angular';
import { DogComponent } from './feature/catWell/catWell.component';
import { ShellComponent } from './shell/shell.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new MultiTranslateHttpLoader(httpClient, [
        { prefix: 'assets/i18n', suffix: '.json?t=' + new Date().getTime() },
    ])
}
@NgModule({
    declarations: [
        AppComponent,
        ShellComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FormsModule,
        AgGridModule,
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                }
            }
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

