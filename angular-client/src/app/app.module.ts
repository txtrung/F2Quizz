import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { QuestionsComponent } from './components/questions/questions.component';
import { ResultsComponent } from './components/results/results.component';
import {QuizzService} from "./services/quizz.service";
import {QuestionService} from "./services/question.service";
import { GiftComponent } from './components/gift/gift.component';
import { GiftExchangeComponent } from './components/gift-exchange/gift-exchange.component';
import {DownloadService} from "./services/download.service";
import { HttpModule } from '@angular/http';

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
    QuestionsComponent,
    ResultsComponent,
    GiftComponent,
    GiftExchangeComponent
  ],
    entryComponents: [
        ResultsComponent,
        GiftComponent,
        GiftExchangeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
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
        ReactiveFormsModule,
    ],
  providers: [
    QuizzService,
    QuestionService,
    DownloadService
  ],
  bootstrap: [AppComponent]
})

// @ts-ignore
export class AppModule { }
