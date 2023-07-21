import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CognitoAuthJwtRolesComponent } from './components/articles/cognito-auth-jwt-roles/cognito-auth-jwt-roles.component';
import { HomeComponent } from './components/home/home.component';
import { AwsS3ToDynamodbPipelineComponent } from './components/articles/aws-s3-to-dynamodb-pipeline/aws-s3-to-dynamodb-pipeline.component';

const routes: Routes = [
  { path:'cognito-auth-jwt-roles', component: CognitoAuthJwtRolesComponent},
  { path:'aws-s3-to-dynamodb-pipeline', component: AwsS3ToDynamodbPipelineComponent},
  { path:'', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
