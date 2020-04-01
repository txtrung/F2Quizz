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
    MatInputModule, MatListModule, MatSelectModule
} from "@angular/material";
import { MasterPageComponent } from './components/master-page/master-page.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { AppBarHeaderComponent } from './components/app-bar-header/app-bar-header.component';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { QuestionsComponent } from './components/questions/questions.component';
import { ResultsComponent } from './components/results/results.component';
import {QuizzService} from "./services/quizz.service";
import {QuestionService} from "./services/question.service";
import { GiftComponent } from './components/gift/gift.component';
import { GiftExchangeComponent } from './components/gift-exchange/gift-exchange.component';
import {DownloadService} from "./services/download.service";
import { HttpModule } from '@angular/http';
import { LoadingComponent } from './components/share/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertComponent } from './components/share/alert/alert.component';
// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import {AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from "angularx-social-login";
import {SocialloginService} from "./services/sociallogin.service";

export function socialConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('629440464278771')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('64618470872-gc2eu3e3t4vpr589hrhhj38tplvkie36.apps.googleusercontent.com')
            }
        ]
    );
    return config;
}

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
    GiftExchangeComponent,
    LoadingComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
  ],
    entryComponents: [
        ResultsComponent,
        GiftComponent,
        GiftExchangeComponent,
        LoadingComponent
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
        MatListModule,
        FlexLayoutModule,
        MatSelectModule
    ],
  providers: [
    QuizzService,
    QuestionService,
    DownloadService,
    LoadingComponent,
  // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    },
  SocialloginService,
  {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
  },
      AuthService

  // provider used to create fake backend
  // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

// @ts-ignore
export class AppModule { }
