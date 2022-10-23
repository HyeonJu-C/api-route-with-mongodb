import { MongoClient } from 'mongodb'
const client = new MongoClient(process.env.mongodb)

async function addEmail(email) {
  await client.connect()
  console.log('Connected successfully to server')

  const db = client.db('events')
  const collection = db.collection('newsletters')
  // newsletters 컬렉션에 데이터를 추가한다.
  // => 이 때 데이터를 document라고 하고, document는 객체 타입이어야 한다.
  await collection.insertOne({ email })
  client.close()
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    // 서버 측에서도 userEmail에 대한 유효성 검사 로직을 추가할 수 있다
    // => 프론트엔드 측의 유효성 검사를 회피한 경우에 대비할 수 있다
    if (!userEmail || !userEmail.includes('@')) {
      // 422 code: invalid input
      res.status(422).json({ message: 'invaild email input' })
      return
    }

    await addEmail(userEmail)

    res.status(201).json({
      message: 'success adding the register email',
      newEmail: userEmail,
    })
  }
}
