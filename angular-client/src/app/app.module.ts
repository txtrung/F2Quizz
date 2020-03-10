import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {
    MatCardModule,
    MatCheckboxModule, MatDialogModule, MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatRadioModule,
    MatToolbarModule,
    MatInputModule
} from "@angular/material";
import { MasterPageComponent } from './components/master-page/master-page.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { AppBarHeaderComponent } from './components/app-bar-header/app-bar-header.component';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { MainContentComponent } from './components/main-content/main-content.component';
import { ResultsComponent } from './components/results/results.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MasterPageComponent,
    QuizzesComponent,
    AppBarHeaderComponent,
    MainContentComponent,
    ResultsComponent
  ],
    entryComponents: [ResultsComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient],
            }
        }),
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatGridListModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatRadioModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})

// @ts-ignore
export class AppModule { }
