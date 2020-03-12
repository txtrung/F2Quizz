import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuizzesComponent} from './components/quizzes/quizzes.component';
import {MasterPageComponent} from "./components/master-page/master-page.component";
import {GlobalConstants} from "./common/global-constants";

const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
  { path: GlobalConstants.quizzesUrl, component: MasterPageComponent},
  { path: GlobalConstants.questionsUrl, component: MasterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }