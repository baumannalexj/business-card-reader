import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {GiphyComponent} from "../../component/giphy/giphy.component";
import {DashboardComponent} from "../../component/dashboard/dashboard.component";
import {LoginComponent} from '../../login/login.component';
import {HistoryComponent} from "../../history/history.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'history', component: HistoryComponent},
  { path: 'giphy', component: GiphyComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class RoutingModule { }
