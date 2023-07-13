import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CognitoAuthJwtRolesComponent } from './components/articles/cognito-auth-jwt-roles/cognito-auth-jwt-roles.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path:'', component: CognitoAuthJwtRolesComponent},
  { path:'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
