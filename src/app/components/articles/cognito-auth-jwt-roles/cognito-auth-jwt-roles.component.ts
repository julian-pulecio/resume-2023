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
  code6 = ` ...
  resources:
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
  code7 = ` provider:
  name: aws
  runtime: python3.9
  httpApi:
    authorizers:
      someJwtAuthorizer:
        type: jwt
        identitySource: $request.header.Authorization
        issuerUrl:
          Fn::Sub: "https://cognito-idp.\${AWS::Region}.amazonaws.com/\${CognitoUserPool}"
        audience:
          - !Ref UserPoolClient`
  code8 = ` ... 
  functions:
    preToken:
      handler: handler.pre_token_auth_lambda
      events:
        - cognitoUserPool:
            pool: MyUserPool
            trigger: PreTokenGeneration
            existing: True

    admin:
      handler: handler.lambda_for_admin_users
      events:
        - httpApi:
            method: GET
            path: /unprotected
            authorizer:
              name: someJwtAuthorizer
              scopes:
                - !Ref AdminCognitoGroup

    regular:
      handler: handler.lambda_for_regular_users
      events:
        - httpApi:
            method: GET
            path: /protected
            authorizer:
              name: someJwtAuthorizer
              scopes:
                - !Ref RegularCognitoGroup`
  code9 = `  import boto3
  import json

  client = boto3.client('cognito-idp')

  def pre_token_auth_lambda(event, context):
      new_scopes = [item for item in event['request']['groupConfiguration']['groupsToOverride']]
      event['response'] = {
          "claimsOverrideDetails": {
              "claimsToAddOrOverride": {
                  "scope": " ".join(new_scopes),
              }
          }
      }
      return event`
  code10 = `  def lambda_for_admin_users(event, context):
      response = {
          'statusCode': 200,
          'body': json.dumps('Hello from Admin User')
      }
      return response`
  code11 = `  def lambda_for_regular_users(event, context):
  response = {
      'statusCode': 200,
      'body': json.dumps('Hello from Regular User')
  }
  return response`
  code12 = `  sls deploy`
  code13 = `  sls deploy`
  code14 = `  python -m venv venv`
  code15 = `  sls plugin install -n serverless-python-requirements`
  code16 = `  pip install boto3`
  code17 = `  pip freeze > requirements.txt`
  code18 = `  aws cognito-idp sign-up 
  --client-id <client-id>
  --username <admin_username>
  --password <password>
  
  aws cognito-idp sign-up 
  --client-id <client-id>
  --username <regular_username>
  --password <password>`
  code19 = `  aws cognito-idp confirm-sign-up
  --region <region>
  --client-id <client-id>
  --username <username>
  --confirmation-code <confirmation-code>`
  code20 = `  aws cognito-idp admin-add-user-to-group
  --user-pool-id <user-pool-id>
  --username <username>
  --group-name <group-name>`
  code21 = `  aws cognito-idp initiate-auth 
  --auth-flow USER_PASSWORD_AUTH
  --client-id <client-id>
  --auth-parameters USERNAME=<username>,PASSWORD=<password>`
  code22 = ` curl -X GET \
  -H "Content-Type: application/x-amz-json-1.1" \
  -H "Authorization: Bearer <access-token>" 
  https://<api-id>.execute-api.<region>.amazonaws.com/protected
  
  curl -X GET \
  -H "Content-Type: application/x-amz-json-1.1" \
  -H "Authorization: Bearer <access-token>" 
  https://<api-id>.execute-api.<region>.amazonaws.com/unprotected`

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
