import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HighlightAutoResult,
  HighlightLoader,
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';

@Component({
  selector: 'app-cognito-auth-jwt-roles',
  standalone: true,
  imports: [CommonModule, HighlightModule],
  templateUrl: './cognito-auth-jwt-roles.component.html',
  styleUrls: ['./cognito-auth-jwt-roles.component.css']
})
export class CognitoAuthJwtRolesComponent {
  
  response!: HighlightAutoResult;

  code = ` npm install -g serverless`;
  code1 = ` # Create a new serverless project
  serverless`
  code2 = ` aws-cognito-auth-with-jwt-roles
  ├─ .gitignore
  ├─ handler.py
  ├─ README.md
  ├─ serverless.yml`
  code3 = ` service: aws-cognito-auth-with-jwt-roles

  frameworkVersion: '3'
  
  provider:
    name: aws
    runtime: python3.9
  
  functions:
    hello:
      handler: handler.hello`
  code4 = ` ...
  resources:
    Resources:
      CognitoUserPool:
        Type: AWS::Cognito::UserPool
        Properties:
          UserPoolName: MyUserPool
          UsernameAttributes:
            - email
          AutoVerifiedAttributes:
            - email
          Policies:
            PasswordPolicy:
              MinimumLength: 8
              RequireLowercase: true
              RequireNumbers: true
              RequireSymbols: true
              RequireUppercase: true
              TemporaryPasswordValidityDays: 0
          Schema:
            - Name: email
              Required: true
              Mutable: false
          EmailVerificationMessage: Hello, {####} World!
          EmailVerificationSubject: Verify your email address`
  code5 = ` ...
  resources:
    Resources:
      CognitoUserPool:
        ...
      UserPoolClient:
        Type: AWS::Cognito::UserPoolClient
        Properties:
          ClientName: MyUserPoolClient
          GenerateSecret: false
          UserPoolId: !Ref CognitoUserPool
          AllowedOAuthFlows:
            - code
          AllowedOAuthFlowsUserPoolClient: true
          AllowedOAuthScopes:
            - email
            - openid
            - profile
          CallbackURLs:
            - https://www.google.com/
          LogoutURLs:
            - https://www.google.com/
          SupportedIdentityProviders:
            - COGNITO
          EnableTokenRevocation: true
          ExplicitAuthFlows:
            - ALLOW_USER_SRP_AUTH
            - ALLOW_REFRESH_TOKEN_AUTH
          ReadAttributes:
            - email
          WriteAttributes:
            - email`
  code6 = ` resources:
  Resources:
    CognitoUserPool:
      ...
    UserPoolClient:
      ...
    AdminCognitoGroup:
      Type: AWS::Cognito::UserPoolGroup
      Properties:
        GroupName: MyAdminGroup
        UserPoolId: !Ref CognitoUserPool
    
    RegularCognitoGroup:
      Type: AWS::Cognito::UserPoolGroup
      Properties:
        GroupName: MyRegularGroup
        UserPoolId: !Ref CognitoUserPool`

  constructor(private hljsLoader: HighlightLoader){}
  onHighlight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}',
    };
  }
}
