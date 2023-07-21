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
  selector: 'app-aws-s3-to-dynamodb-pipeline',
  standalone: true,
  imports: [CommonModule, HighlightModule],
  templateUrl: './aws-s3-to-dynamodb-pipeline.component.html',
  styleUrls: ['./aws-s3-to-dynamodb-pipeline.component.css']
})
export class AwsS3ToDynamodbPipelineComponent {
  response!: HighlightAutoResult;
  code1 = `  ...
  resources:
    Resources:
      S3Bucket:
        Type: AWS::S3::Bucket
        Properties:
          BucketName: s3-to-dynamodb-bucket-julianpulecio
          NotificationConfiguration: 
            QueueConfigurations:
              - Event : 's3:ObjectCreated:*'
                Queue : !GetAtt [SQSQueue, Arn]
        DependsOn: SQSQueue`
  code2 = `  ...
  resources:
    Resources:
      S3Bucket:
        ...
      SQSQueue:
        Type: AWS::SQS::Queue
        Properties:
          QueueName: s3-to-dynamodb-SQSQueue-julianpulecio
          RedrivePolicy:
            deadLetterTargetArn: !GetAtt [DeadLetterQueue, Arn]
            maxReceiveCount: 5
      DeadLetterQueue:
        Type: AWS::SQS::Queue
        Properties:
          QueueName: s3-to-dynamodb-SQSDeadLetterQueue-julianpulecio`
  code3 = `  ...
  resources:
    Resources:
      S3Bucket:
        ...
      SQSQueue:
        ...
      DeadLetterQueue:
        ...
      SqsPolicy: 
        Type: AWS::SQS::QueuePolicy
        Properties: 
          Queues: 
            - !Ref SQSQueue
          PolicyDocument: 
            Statement: 
              - Effect: Allow
                Principal: '*'
                Action: 'SQS:*'
                Resource: !GetAtt [SQSQueue, Arn]`
  code4 = `  ...
  functions:
    populate_dynamodb_table:
      handler: src.handlers.create_handler.populate_dynamodb_table
      timeout: 600
      iamRoleStatementsName: lambda-s3-to-dynamo-role
      iamRoleStatements:
        - Effect: "Allow"        
          Action: 
            - s3:GetObject       
            - s3:ListBucket
          Resource: 
            - !GetAtt [S3Bucket, Arn]
            - !Sub "arn:aws:s3:::\${S3Bucket}/*"
        - Effect: "Allow"        
          Action: 
            - dynamodb:CreateTable
            - dynamodb:PutItem
            - dynamodb:ListTables
            - dynamodb:DescribeTable
          Resource: 
            - "*"
      events:
        - sqs:
            arn:
              Fn::GetAtt:
                - SQSQueue
                - Arn`
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
