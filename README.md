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

```js
import { MongoClient } from 'mongodb';

const client = new MongoClient(connectionUrl);

async function addUser(userName) {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');

  // now you can access to the db
  const db = client.db(dbName);
  const collection = db.collection(colName);

  // do something...
  await collection.insertOne({ userName });
  client.close();
}

addUser('hyeonju')
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
```
