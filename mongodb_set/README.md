
## docker compose up으로 mongodb 구성
- port 27017:27017
- username root
- password 12341234
- DBNAME baedal


# mongosh에서 사용자 구성
```
use baedal
db.createUser(
   {
     user: "사용자이름",
     pwd: passwordPrompt(),
     roles: [ "readWrite", "dbAdmin" ]
   }
)
```


# mongoDB 접속 문자열
```
mongodb://사용자이름:비번@localhost:27017/baedal
```
