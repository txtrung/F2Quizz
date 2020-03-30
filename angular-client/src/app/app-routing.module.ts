import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuizzesComponent} from './components/quizzes/quizzes.component';
import {MasterPageComponent} from "./components/master-page/master-page.component";
import {GlobalConstants} from "./common/global-constants";
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: GlobalConstants.quizzesUrl, component: MasterPageComponent},
  { path: GlobalConstants.questionsUrl, component: MasterPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }