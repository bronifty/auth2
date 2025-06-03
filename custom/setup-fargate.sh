#!/bin/bash

# Replace these variables with your values
AWS_REGION="us-east-1"  # Change to your preferred region
CLUSTER_NAME="deno-cells-cluster"
SERVICE_NAME="deno-cells-service"
VPC_ID=""  # You'll need to provide your VPC ID
SUBNET_IDS=""  # You'll need to provide your subnet IDs
SECURITY_GROUP_ID=""  # You'll need to provide your security group ID

# Create ECS cluster
aws ecs create-cluster --cluster-name $CLUSTER_NAME

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service \
    --cluster $CLUSTER_NAME \
    --service-name $SERVICE_NAME \
    --task-definition deno-cells \
    --desired-count 1 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_IDS],securityGroups=[$SECURITY_GROUP_ID],assignPublicIp=ENABLED}"

echo "Service creation initiated. You can check the status in the AWS Console." 