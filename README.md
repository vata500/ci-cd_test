# Food_delivery_application_customer
![image](https://user-images.githubusercontent.com/89952061/186397812-08ab2316-c16a-4845-893e-fa6dddb73d11.png)

- 고객용 음식 배달 어플리케이션
- fastify 프레임워크 활용

### 주요 directory
- 상위 repo는 백엔드로 구성
- customer_frontend : react로 구현된 고객전용 정적 웹페이지
- mongodb_set : docker 이미지를 활용하여 구성되는 mongodb 데이터베이스

### 백엔드
![image](https://user-images.githubusercontent.com/89952061/186393384-b99da795-b337-463e-a4d8-0a567c30ad00.png)
- Github action을 활용하여 build, ECS 배포 자동화
```
# # /.github/workflows/main.yml

name: Deploy to Amazon ECS

on:
  push:
    branches:
      - "jh"

env:
  AWS_REGION: us-east-1                  # set this to your preferred AWS region, e.g. us-west-1
  ECR_REPOSITORY: project2-ecr           # set this to your Amazon ECR repository name
  ECS_SERVICE: was-service                 # set this to your Amazon ECS service name
  ECS_CLUSTER: project2-cluster                # set this to your Amazon ECS cluster name
  ECS_TASK_DEFINITION: ./project2-was-task.json # set this to the path to your Amazon ECS task definition
                                               # file, e.g. .aws/task-definition.json
  CONTAINER_NAME: p2-was-container           # set this to the name of the container in the
                                               # containerDefinitions section of your task definition

permissions:
  contents: read

jobs:
...
```
- Task Definition을 바탕으로 Task를 생성
- 지정된 ALB를 통해 Deploy

### 프론트엔드
![image](https://user-images.githubusercontent.com/89952061/186392926-c7c6e7f7-4eb3-4e1b-9d5e-777d7343164a.png)
- CodePipeline을 통해 자동 build, artifact to AWS S3 Bucket
```
# /buildspec.yml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 12
  pre_build:
    commands:
      - cd customer_frontend
  build:
    commands:
      - echo Buile Phase >> Build started on `date`
      - npm install
      - npm run build
  post_build:
    commands:
      - echo Buile Phase >> Build completed on `date`
artifacts:
  files:
    - '**/*'
  base-directory: customer_frontend/build

```

- Github action을 활용하여 자동 build, artifact to AWS S3 Bucket(추가)
```
# customer_frontend/.github/workflows/main.yml
name: workflow for S3 Deploy
on: [push]
jobs:
  run:
    runs-on: ubuntu-latest
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    steps:
        - uses: actions/checkout@v3

        - name: Install dependencies
          run: npm install

        - name: Build
          run: CI='' npm run build

        - name: Deploy
          uses: reggionick/s3-deploy@v3
          with:
            folder: build
            bucket: ${{ secrets.S3_BUCKET }}
            bucket-region: ${{ secrets.S3_BUCKET_REGION }}
            invalidation: /
            delete-removed: true
            no-cache: true
            private: false
            filesToInclude: ".*/*,*/*,**"


```


### 데이터베이스
- Mongodb NoSQL
- 도커 이미지(mongo)를 활용하여 구성
- mongo-init.js을 통해 기본 collection 설정
