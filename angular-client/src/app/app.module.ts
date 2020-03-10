import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatRadioModule,
  MatToolbarModule
} from "@angular/material";
import { MasterPageComponent } from './master-page/master-page.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { AppBarHeaderComponent } from './app-bar-header/app-bar-header.component';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { MainContentComponent } from './main-content/main-content.component';

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
    MainContentComponent
  ],
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})

// @ts-ignore
export class AppModule { }
