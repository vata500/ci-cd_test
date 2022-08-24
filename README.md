# Food_delivery_application_customer
- 고객용 음식 배달 어플리케이션
- fastify 프레임워크 활용

### 주요 directory
- 상위 repo는 백엔드로 구성
- customer_frontend : react로 구현된 고객전용 정적 웹페이지
- mongodb_set : docker 이미지를 활용하여 구성되는 mongodb 데이터베이스

### 백엔드
![image](https://user-images.githubusercontent.com/89952061/186393384-b99da795-b337-463e-a4d8-0a567c30ad00.png)
- Github action을 활용하여 build된 이미지를 ECS에 배포
- Task Definition을 바탕으로 Task를 생성
- 지정된 ALB를 통해 Deploy

### 프론트엔드
![image](https://user-images.githubusercontent.com/89952061/186392926-c7c6e7f7-4eb3-4e1b-9d5e-777d7343164a.png)
- Github action을 활용하여 build된 artifact를 AWS의 S3 Bucket에 자동 업로드

### 데이터베이스
- Mongodb NoSQL
- 도커 이미지(mongo)를 활용하여 구성
- mongo-init.js을 통해 기본 collection 설정
