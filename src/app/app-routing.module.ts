import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/user/authguard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'pr-create', loadChildren: './pages/pr-create/pr-create.module#PrCreatePageModule', canActivate: [AuthGuard] },
  { path: 'pr-detail/:id', loadChildren: './pages/pr-detail/pr-detail.module#PrDetailPageModule', canActivate: [AuthGuard] },
  { path: 'pr-list', loadChildren: './pages/pr-list/pr-list.module#PrListPageModule', canActivate: [AuthGuard] },
  {
    path: 'show-percentages/:id', loadChildren: './pages/show-percentages/show-percentages.module#ShowPercentagesPageModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
