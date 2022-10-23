# next.js with mongoDB

## 연결 방법

1. [mongo DB 웹사이트](https://www.mongodb.com/)에서 클러스터를 생성한다.
2. 프로젝트 폴더에 mongodb 패키지를 설치한다([문서](https://www.npmjs.com/package/mongodb)).
   - `yarn add mongodb`
   - `npm install mongodb`
3. 생성된 클러스터의 Security/Network Access 탭에서 DB에 접근 가능한 IP 목록(white list)을 추가한다.

   - local machine의 IP
   - 어플리케이션 배포 서버의 IP

4. 생성된 클러스터의 connection url을 확인한다.

## example code

1. [DB 연결, 데이터 추가 및 읽기](https://github.com/HyeonJu-C/api-route-with-mongodb/blob/main/helpers/mongodb.js)
2. [에러 핸들링](https://github.com/HyeonJu-C/api-route-with-mongodb/blob/main/pages/api/newsletter/index.js)
